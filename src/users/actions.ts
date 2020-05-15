import { createAsyncAction, ActionType } from 'typesafe-actions'
import { User, UserData } from './types'

const UsersActions = {
  getUsers: createAsyncAction(
    'users/getUsersRequest',
    'users/getUsersSuccess',
    'users/getUsersFailure'
  )<void, UserData[], Error>(),
  deactivateUser: createAsyncAction(
    'users/deactivateUserRequest',
    'users/deactivateUserSuccess',
    'users/deactivateUserFailure'
  )<User, User, Error>(),
  activateUser: createAsyncAction(
    'users/activateUserRequest',
    'users/activateUserSuccess',
    'users/activateUserFailure'
  )<User, User, Error>(),
}

export type UsersAction = ActionType<typeof UsersActions>

export default UsersActions
