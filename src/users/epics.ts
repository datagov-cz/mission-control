import { isActionOf } from 'typesafe-actions'
import { combineEpics } from 'redux-observable'
import { of } from 'rxjs'
import { filter, map, switchMap, catchError } from 'rxjs/operators'

import { Epic } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { getJSON } from 'app/utils/ajax'
import { onRouteEnter } from 'app/utils/epic'

import { USERS_URL } from './constants'
import { User } from './types'

const getDataOnRouteEnter: Epic = ($action) =>
  onRouteEnter($action, Routes.Users).pipe(
    switchMap(() => of(Actions.Users.getUsers.request()))
  )

const getUsers: Epic = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Users.getUsers.request)),
    switchMap(() =>
      getJSON(USERS_URL).pipe(
        map((users) => Actions.Users.getUsers.success(users as User[])),
        catchError((error: Error) =>
          of(
            Actions.Users.getUsers.failure(
              new Error(`Cannot load identity: ${error.message}`)
            )
          )
        )
      )
    )
  )

export default combineEpics(getDataOnRouteEnter, getUsers)
