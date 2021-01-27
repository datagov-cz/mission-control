import { combineEpics } from 'redux-observable'
import { merge } from 'rxjs'
import { map, switchMap, mapTo } from 'rxjs/operators'

import { Epic } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { getJSON, del, post } from 'app/utils/ajax'
import { onRouteEnter, ofSafeType, mapError } from 'app/utils/epic'

import { UserData } from './types'
import { getUsersUrl, getUserStatusUrl } from './api'

const getDataOnRouteEnter: Epic = ($action) =>
  onRouteEnter($action, Routes.Users).pipe(
    mapTo(Actions.Users.getUsers.request())
  )

const getUsers: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Users.getUsers.request),
    switchMap(() =>
      getJSON(getUsersUrl()).pipe(
        map((users) => Actions.Users.getUsers.success(users as UserData[])),
        mapError(Actions.Users.getUsers.failure)
      )
    )
  )

const deactivateUser: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Users.deactivateUser.request),
    switchMap(({ payload }) =>
      del(getUserStatusUrl(payload)).pipe(
        mapTo(Actions.Users.deactivateUser.success(payload)),
        mapError(Actions.Users.deactivateUser.failure)
      )
    )
  )

const activateUser: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Users.activateUser.request),
    switchMap(({ payload }) =>
      post(getUserStatusUrl(payload)).pipe(
        mapTo(Actions.Users.activateUser.success(payload)),
        mapError(Actions.Users.activateUser.failure)
      )
    )
  )

const notificationAfterUserStatusChanged: Epic = ($action) =>
  merge(
    merge(
      $action.pipe(ofSafeType(Actions.Users.deactivateUser.success)),
      $action.pipe(ofSafeType(Actions.Users.activateUser.success))
    ).pipe(mapTo(Actions.Snackbar.success('users.userStatusUpdateSuccess'))),
    merge(
      $action.pipe(ofSafeType(Actions.Users.deactivateUser.failure)),
      $action.pipe(ofSafeType(Actions.Users.activateUser.failure))
    ).pipe(mapTo(Actions.Snackbar.error('users.userStatusUpdateFailure')))
  )

const refreshAfterUserStatusChanged: Epic = ($action) =>
  merge(
    $action.pipe(ofSafeType(Actions.Users.deactivateUser.success)),
    $action.pipe(ofSafeType(Actions.Users.activateUser.success))
  ).pipe(mapTo(Actions.Users.getUsers.request()))

export default combineEpics(
  getDataOnRouteEnter,
  getUsers,
  deactivateUser,
  activateUser,
  notificationAfterUserStatusChanged,
  refreshAfterUserStatusChanged
)
