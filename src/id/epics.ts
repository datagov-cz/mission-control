import { isActionOf } from 'typesafe-actions'
import { Epic, combineEpics } from 'redux-observable'
import { merge, of, zip } from 'rxjs'
import {
  filter,
  mergeMap,
  map,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators'
import { push } from 'connected-react-router'

import { Actions, Action } from 'app/actions'
import { State } from 'app/reducers'
import Routes from 'app/routes'
import { post, getJSON } from 'utils/ajax'
import { removeToken } from 'utils/auth'

import { LoginPayload, Identity } from './types'

const loginRequest = (payload: LoginPayload) =>
  post('/j_spring_security_check', payload)

const getMyIdRequest = () => getJSON('/rest/users/current')

const init: Epic<Action, Action, State> = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.init)),
    mergeMap(() =>
      merge(
        $action.pipe(
          filter(isActionOf(Actions.Id.getMyId.success)),
          map(Actions.Id.initFinished)
        ),
        $action.pipe(
          filter(isActionOf(Actions.Id.getMyId.failure)),
          map(Actions.Id.initFinished)
        ),
        of(Actions.Id.getMyId.request())
      )
    )
  )

const navigateAfterInitFailure: Epic<Action, Action, State> = ($action) =>
  zip(
    $action.pipe(filter(isActionOf(Actions.Init.initAppFinished))),
    $action.pipe(filter(isActionOf(Actions.Id.getMyId.failure)))
  ).pipe(map(() => push(Routes.Login)))

const getMyId: Epic<Action, Action, State> = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.getMyId.request)),
    switchMap(() =>
      getMyIdRequest().pipe(
        map((identity) => Actions.Id.getMyId.success(identity as Identity)),
        catchError((error: Error) =>
          of(
            Actions.Id.getMyId.failure(
              new Error(`cannot load identity: ${error.message}`)
            )
          )
        )
      )
    )
  )

const login: Epic<Action, Action, State> = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.login.request)),
    switchMap(({ payload }) =>
      loginRequest(payload).pipe(
        mergeMap(() =>
          merge(
            $action.pipe(
              filter(isActionOf(Actions.Id.getMyId.success)),
              map(({ payload }) => Actions.Id.login.success(payload))
            ),
            $action.pipe(
              filter(isActionOf(Actions.Id.getMyId.failure)),
              map(({ payload }) => Actions.Id.login.failure(payload))
            ),
            of(Actions.Id.getMyId.request())
          )
        ),
        catchError((error: Error) =>
          of(
            Actions.Id.login.failure(
              new Error(`Cannot login: ${error.message}`)
            )
          )
        )
      )
    )
  )

const navigateAfterLogin: Epic<Action, Action, State> = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.login.success)),
    switchMap(() => of(push(Routes.Dashboard)))
  )

const logout: Epic<Action, Action, State> = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.logout.request)),
    tap(() => removeToken()),
    map(() => Actions.Id.logout.success())
  )

const navigateAfterLogout: Epic<Action, Action, State> = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.logout.success)),
    switchMap(() => of(push(Routes.Login)))
  )

export default combineEpics(
  init,
  navigateAfterInitFailure,
  getMyId,
  login,
  navigateAfterLogin,
  logout,
  navigateAfterLogout
)
