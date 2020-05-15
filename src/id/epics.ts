import { combineEpics } from 'redux-observable'
import { merge, of, race } from 'rxjs'
import { mergeMap, map, mapTo, tap, switchMap } from 'rxjs/operators'

import { Epic } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { post, postJSON, getJSON, putJSON } from 'app/utils/ajax'
import { removeToken } from 'app/utils/auth'
import { ofSafeType, mapError } from 'app/utils/epic'

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
    ofSafeType(Actions.Id.init),
    switchMap(() =>
      merge(
        of(Actions.Id.getMyId.request()),
        race(
          $action.pipe(
            ofSafeType(Actions.Id.getMyId.success),
            mapTo(Actions.Id.initFinished())
          ),
          $action.pipe(
            ofSafeType(Actions.Id.getMyId.failure),
            switchMap(() =>
              of(
                Actions.Router.navigateTo({ name: Routes.Login }),
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
    ofSafeType(Actions.Id.getMyId.request),
    switchMap(() =>
      getJSON(MY_ID_URL).pipe(
        map((identity) => Actions.Id.getMyId.success(identity as Identity)),
        mapError(Actions.Id.getMyId.failure)
      )
    )
  )

const login: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Id.login.request),
    switchMap(({ payload }) =>
      post(LOGIN_URL, payload).pipe(
        mergeMap(() =>
          merge(
            of(Actions.Id.getMyId.request()),
            $action.pipe(
              ofSafeType(Actions.Id.getMyId.success),
              map(({ payload }) => Actions.Id.login.success(payload))
            ),
            $action.pipe(
              ofSafeType(Actions.Id.getMyId.failure),
              map(({ payload }) => Actions.Id.login.failure(payload))
            )
          )
        ),
        mapError(Actions.Id.login.failure)
      )
    )
  )

const notificationAfterLogin: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Id.login.failure),
    mapTo(Actions.Snackbar.error('id.loginError'))
  )

const navigateAfterLogin: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Id.login.success),
    mapTo(Actions.Router.navigateTo({ name: Routes.Dashboard }))
  )

const logout: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Id.logout.request),
    tap(() => removeToken()),
    map(() => Actions.Id.logout.success())
  )

const navigateAfterLogout: Epic = ($action, store$) =>
  $action.pipe(
    ofSafeType(Actions.Id.logout.success),
    mapTo(Actions.Router.navigateTo({ name: Routes.Login }))
  )

const register: Epic = ($action, store$) =>
  $action.pipe(
    ofSafeType(Actions.Id.register.request),
    switchMap(({ payload }) =>
      postJSON(REGISTRATION_URL, payload).pipe(
        map(() => Actions.Id.register.success(payload)),
        mapError(Actions.Id.register.failure)
      )
    )
  )

const notificationAfterRegistration: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Id.register.success),
      mapTo(Actions.Snackbar.success('id.registrationSuccess'))
    ),
    $action.pipe(
      ofSafeType(Actions.Id.register.failure),
      mapTo(Actions.Snackbar.error('id.registrationError'))
    )
  )

const loginAfterRegistration: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Id.register.success),
    map(({ payload }) => Actions.Id.login.request(payload))
  )

const editProfile: Epic = ($action, store$) =>
  $action.pipe(
    ofSafeType(Actions.Id.editProfile.request),
    switchMap(({ payload }) => {
      const identity = getIdentity(store$.value)
      return putJSON(EDIT_PROFILE_URL, { ...identity, ...payload }).pipe(
        mapTo(Actions.Id.editProfile.success()),
        mapError(Actions.Id.editProfile.failure)
      )
    })
  )

const navigateAfterEditProfile: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Id.editProfile.success),
    mapTo(Actions.Router.navigateTo({ name: Routes.MeProfile }))
  )

const notificationAfterEditProfile: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Id.editProfile.success),
      mapTo(Actions.Snackbar.success('id.editProfileSuccess'))
    ),
    $action.pipe(
      ofSafeType(Actions.Id.editProfile.failure),
      mapTo(Actions.Snackbar.error('id.editProfileError'))
    )
  )

const changePassword: Epic = ($action, store$) =>
  $action.pipe(
    ofSafeType(Actions.Id.changePassword.request),
    switchMap(({ payload }) => {
      const identity = getIdentity(store$.value)
      return putJSON(EDIT_PROFILE_URL, { ...identity, ...payload }).pipe(
        mapTo(Actions.Id.changePassword.success()),
        mapError(Actions.Id.changePassword.failure)
      )
    })
  )

const navigateAfterChangePassword: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Id.changePassword.success),
    mapTo(Actions.Router.navigateTo({ name: Routes.MeProfile }))
  )

const notificationAfterChangePassword: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Id.changePassword.success),
      mapTo(Actions.Snackbar.success('id.changePasswordSuccess'))
    ),
    $action.pipe(
      ofSafeType(Actions.Id.changePassword.failure),
      mapTo(Actions.Snackbar.error('id.changePasswordError'))
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
  notificationAfterEditProfile,
  changePassword,
  navigateAfterChangePassword,
  notificationAfterChangePassword
)
