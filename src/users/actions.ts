import { createAsyncAction, ActionType } from 'typesafe-actions'
import { User } from './types'

const UsersActions = {
  getUsers: createAsyncAction(
    'users/getUsersRequest',
    'users/getUsersSuccess',
    'users/getUsersFailure'
  )<void, User[], Error>(),
}

export type UsersAction = ActionType<typeof UsersActions>

export default UsersActions
