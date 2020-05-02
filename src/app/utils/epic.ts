import { ActionsObservable } from 'redux-observable'
import { combineLatest } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { actionTypes } from 'redux-router5'

import Actions from 'app/actions'
import { Action } from 'app/types'
import { TransitionSuccessAction } from 'app/actions/router'
import { isActionOf } from 'typesafe-actions'

export const isTransitionSuccess = (
  action: Action
): action is TransitionSuccessAction =>
  action.type === actionTypes.TRANSITION_SUCCESS

const isRouteEnter = (routeName: string) => ({
  payload: { previousRoute, route },
}: TransitionSuccessAction): boolean =>
  (previousRoute === null || previousRoute.name !== routeName) &&
  route !== null &&
  route.name === routeName

const isRouteLeave = (routeName: string) => ({
  payload: { previousRoute, route },
}: TransitionSuccessAction): boolean =>
  (previousRoute === null || previousRoute.name === routeName) &&
  (route === null || route.name !== routeName)

export const onRouteEnter = (
  $action: ActionsObservable<Action>,
  routeName: string
) =>
  combineLatest(
    $action.pipe(filter(isActionOf(Actions.App.initFinished))),
    $action.pipe(filter(isTransitionSuccess))
  ).pipe(
    map(([init, transitionSuccessAction]) => transitionSuccessAction),
    filter(isRouteEnter(routeName)),
    map((transitionSuccessAction) => transitionSuccessAction.payload)
  )

export const onRouteLeave = (
  $action: ActionsObservable<Action>,
  routeName: string
) =>
  combineLatest(
    $action.pipe(filter(isActionOf(Actions.App.initFinished))),
    $action.pipe(filter(isTransitionSuccess))
  ).pipe(
    map(([init, transitionSuccessAction]) => transitionSuccessAction),
    filter(isRouteLeave(routeName)),
    map((transitionSuccessAction) => transitionSuccessAction.payload)
  )
