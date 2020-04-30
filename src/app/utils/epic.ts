import { ActionsObservable } from 'redux-observable'
import { merge, of } from 'rxjs'
import { filter, mergeMap, switchMap, takeUntil } from 'rxjs/operators'
import { actionTypes } from 'redux-router5'

import { Action, Epic } from 'app/types'
import { TransitionSuccessAction } from 'app/actions/router'
import router from 'app/router'

export const isTransitionSuccess = (
  action: Action
): action is TransitionSuccessAction =>
  action.type === actionTypes.TRANSITION_SUCCESS

const isRouteEnter = (routeName: string) => ({
  payload: { previousRoute, route },
}: TransitionSuccessAction): boolean =>
  (previousRoute === null || !previousRoute.name.startsWith(routeName)) &&
  route !== null &&
  route.name.startsWith(routeName)

const isRouteLeave = (routeName: string) => ({
  payload: { previousRoute, route },
}: TransitionSuccessAction): boolean =>
  (previousRoute === null || previousRoute.name.startsWith(routeName)) &&
  (route === null || !route.name.startsWith(routeName))

const $routeEnter = ($action: ActionsObservable<Action>, routeName: string) =>
  $action.pipe(filter(isTransitionSuccess), filter(isRouteEnter(routeName)))

const $routeLeave = ($action: ActionsObservable<Action>, routeName: string) =>
  $action.pipe(filter(isTransitionSuccess), filter(isRouteLeave(routeName)))

export const isInRoute = (routeName: string) => {
  const routerState = router.getState()
  const { name } = routerState === null ? { name: '' } : routerState
  return name.startsWith(routeName)
}

const $enteringRoute = (
  $action: ActionsObservable<Action>,
  routeName: string
) => {
  const fromAction = $routeEnter($action, routeName)
  const alreadyActive = isInRoute(routeName)
  return alreadyActive ? merge(of(null), fromAction) : fromAction
}

export const inRoute = (routeName: string, epic: Epic): Epic => (
  $action,
  state$,
  dependencies
) =>
  $enteringRoute($action, routeName).pipe(
    switchMap(() =>
      epic($action, state$, dependencies).pipe(
        takeUntil($routeLeave($action, routeName))
      )
    )
  )

type ActionOrActions = Action | Action[]
type ActionOrActionsFn = () => ActionOrActions

const getActions = (action: ActionOrActions | ActionOrActionsFn) => {
  const res = typeof action === 'function' ? action() : action
  return Array.isArray(res) ? res : [res]
}

export const onRouteEnter = (
  routeName: string,
  action: ActionOrActions | ActionOrActionsFn
): Epic => ($action) =>
  $enteringRoute($action, routeName).pipe(mergeMap(() => getActions(action)))

export const onRouteLeave = (
  routeName: string,
  action: ActionOrActions | ActionOrActionsFn
): Epic => ($action) =>
  $routeLeave($action, routeName).pipe(mergeMap(() => getActions(action)))
