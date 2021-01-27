import { ActionsObservable } from 'redux-observable'
import {
  combineLatest,
  of,
  Observable,
  ObservedValueOf,
  OperatorFunction,
} from 'rxjs'
import { filter, map, catchError, switchMap } from 'rxjs/operators'

import Actions from 'app/actions'
import { Action } from 'app/types'
import { TransitionSuccessAction } from 'app/actions/router'
import { isActionOf, ActionCreator, TypeConstant } from 'typesafe-actions'

/**
 * Filters a particular action in an epic, while ensuring payload type safety
 */
export const ofSafeType = <TActionCreator extends ActionCreator<TypeConstant>>(
  action: TActionCreator
) => filter(isActionOf(action))

/**
 * Catches an error in an epic and maps the Error object to a provided action
 */
export const mapError = <T, TError extends Error, TErrorAction extends Action>(
  errorActionCreator: (err: TError) => TErrorAction
): OperatorFunction<T, T | ObservedValueOf<Observable<TErrorAction>>> =>
  catchError<T, Observable<TErrorAction>>((error) =>
    of(errorActionCreator(error))
  )

/**
 * Fires multiple consecutive actions out of an epic
 */
export const fire = (...args: Action[]) => switchMap(() => of(...args))

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
    $action.pipe(ofSafeType(Actions.App.initFinished)),
    $action.pipe(ofSafeType(Actions.Router.transitionSuccess))
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
    $action.pipe(ofSafeType(Actions.App.initFinished)),
    $action.pipe(ofSafeType(Actions.Router.transitionSuccess))
  ).pipe(
    map(([init, transitionSuccessAction]) => transitionSuccessAction),
    filter(isRouteLeave(routeName)),
    map((transitionSuccessAction) => transitionSuccessAction.payload)
  )
