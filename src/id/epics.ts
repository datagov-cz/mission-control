import { isActionOf } from 'typesafe-actions'
import { combineEpics } from 'redux-observable'
import { merge, of, zip } from 'rxjs'
import {
  filter,
  mergeMap,
  map,
  tap,
  switchMap,
  catchError,
  first,
} from 'rxjs/operators'
import { push } from 'connected-react-router'

import { Epic } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { post, postJSON, getJSON } from 'utils/ajax'
import { removeToken } from 'utils/auth'

import { Identity } from './types'
import { LOGIN_URL, MY_ID_URL, REGISTRATION_URL } from './constants'

const init: Epic = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.init)),
    mergeMap(() =>
      merge(
        $action.pipe(filter(isActionOf(Actions.Id.getMyId.success))),
        $action.pipe(filter(isActionOf(Actions.Id.getMyId.failure))),
        of(Actions.Id.getMyId.request())
      )
    ),
    first(),
    map(Actions.Id.initFinished)
  )

const navigateAfterInitFailure: Epic = ($action) =>
  zip(
    $action.pipe(filter(isActionOf(Actions.App.initFinished))),
    $action.pipe(filter(isActionOf(Actions.Id.getMyId.failure)))
  ).pipe(map(() => push(Routes.Login)))

const getMyId: Epic = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.getMyId.request)),
    switchMap(() =>
      getJSON(MY_ID_URL).pipe(
        map((identity) => Actions.Id.getMyId.success(identity as Identity)),
        catchError((error: Error) =>
          of(
            Actions.Id.getMyId.failure(
              new Error(`Cannot load identity: ${error.message}`)
            )
          )
        )
      )
    )
  )

const login: Epic = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.login.request)),
    switchMap(({ payload }) =>
      post(LOGIN_URL, payload).pipe(
        tap(({ response }) => {
          if (response.errorId) {
            throw new Error()
          }
        }),
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

const notificationAfterLogin: Epic = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.login.failure)),
    map(() => Actions.App.error('id.loginError'))
  )

const navigateAfterLogin: Epic = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.login.success)),
    switchMap(() => of(push(Routes.Dashboard)))
  )

const logout: Epic = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.logout.request)),
    tap(() => removeToken()),
    map(() => Actions.Id.logout.success())
  )

const navigateAfterLogout: Epic = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.logout.success)),
    switchMap(() => of(push(Routes.Login)))
  )

const register: Epic = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.register.request)),
    switchMap(({ payload }) =>
      postJSON(REGISTRATION_URL, payload).pipe(
        map(() => Actions.Id.register.success(payload)),
        catchError((error: Error) =>
          of(
            Actions.Id.register.failure(
              new Error(`Cannot register: ${error.message}`)
            )
          )
        )
      )
    )
  )

const notificationAfterRegistration: Epic = ($action) =>
  merge(
    $action.pipe(
      filter(isActionOf(Actions.Id.register.success)),
      map(() => Actions.App.success('id.registrationSuccess'))
    ),
    $action.pipe(
      filter(isActionOf(Actions.Id.register.failure)),
      map(() => Actions.App.error('id.registrationError'))
    )
  )

const loginAfterRegistration: Epic = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.register.success)),
    map(({ payload }) => Actions.Id.login.request(payload))
  )

export default combineEpics(
  init,
  navigateAfterInitFailure,
  getMyId,
  login,
  notificationAfterLogin,
  navigateAfterLogin,
  logout,
  navigateAfterLogout,
  register,
  notificationAfterRegistration,
  loginAfterRegistration
)
