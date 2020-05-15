import { combineEpics } from 'redux-observable'
import { map, switchMap, mapTo } from 'rxjs/operators'

import { Epic } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { getJSON } from 'app/utils/ajax'
import { onRouteEnter, ofSafeType, mapError } from 'app/utils/epic'

import { USERS_URL } from './constants'
import { User } from './types'

const getDataOnRouteEnter: Epic = ($action) =>
  onRouteEnter($action, Routes.Users).pipe(
    mapTo(Actions.Users.getUsers.request())
  )

const getUsers: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Users.getUsers.request),
    switchMap(() =>
      getJSON(USERS_URL).pipe(
        map((users) => Actions.Users.getUsers.success(users as User[])),
        mapError(Actions.Users.getUsers.failure)
      )
    )
  )

export default combineEpics(getDataOnRouteEnter, getUsers)
