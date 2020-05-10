import { isActionOf } from 'typesafe-actions'
import { combineEpics } from 'redux-observable'
import { merge, of, race } from 'rxjs'
import {
  filter,
  mergeMap,
  map,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators'

import { Epic } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { post, postJSON, getJSON, putJSON } from 'app/utils/ajax'
import { removeToken } from 'app/utils/auth'

import { Identity } from './types'
import {
  LOGIN_URL,
  MY_ID_URL,
  REGISTRATION_URL,
  EDIT_PROFILE_URL,
} from './constants'
import { getIdentity } from './selectors'

const init: Epic = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.init)),
    switchMap(() =>
      merge(
        of(Actions.Id.getMyId.request()),
        race(
          $action.pipe(
            filter(isActionOf(Actions.Id.getMyId.success)),
            map(() => Actions.Id.initFinished())
          ),
          $action.pipe(
            filter(isActionOf(Actions.Id.getMyId.failure)),
            switchMap(() =>
              of(
                Actions.Router.navigateTo(Routes.Login),
                Actions.Id.initFinished()
              )
            )
          )
        )
      )
    )
  )

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
    map(() => Actions.Snackbar.error('id.loginError'))
  )

const navigateAfterLogin: Epic = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.login.success)),
    switchMap(() => of(Actions.Router.navigateTo(Routes.Dashboard)))
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
    switchMap(() => of(Actions.Router.navigateTo(Routes.Login)))
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
      map(() => Actions.Snackbar.success('id.registrationSuccess'))
    ),
    $action.pipe(
      filter(isActionOf(Actions.Id.register.failure)),
      map(() => Actions.Snackbar.error('id.registrationError'))
    )
  )

const loginAfterRegistration: Epic = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.register.success)),
    map(({ payload }) => Actions.Id.login.request(payload))
  )

const editProfile: Epic = ($action, store$) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.editProfile.request)),
    switchMap(({ payload }) => {
      const { uri, username } = getIdentity(store$.value)
      return putJSON(EDIT_PROFILE_URL, { uri, username, ...payload }).pipe(
        map(() => Actions.Id.editProfile.success()),
        catchError((error: Error) =>
          of(
            Actions.Id.editProfile.failure(
              new Error(`Cannot edit profile: ${error.message}`)
            )
          )
        )
      )
    })
  )

const navigateAfterEditProfile: Epic = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Id.editProfile.success)),
    switchMap(() => of(Actions.Router.navigateTo(Routes.MeProfile)))
  )

const notificationAfterEditProfile: Epic = ($action) =>
  merge(
    $action.pipe(
      filter(isActionOf(Actions.Id.editProfile.success)),
      map(() => Actions.Snackbar.success('id.editProfileSuccess'))
    ),
    $action.pipe(
      filter(isActionOf(Actions.Id.editProfile.failure)),
      map(() => Actions.Snackbar.error('id.editProfileError'))
    )
  )

export default combineEpics(
  init,
  getMyId,
  login,
  notificationAfterLogin,
  navigateAfterLogin,
  logout,
  navigateAfterLogout,
  register,
  notificationAfterRegistration,
  loginAfterRegistration,
  editProfile,
  navigateAfterEditProfile,
  notificationAfterEditProfile
)
