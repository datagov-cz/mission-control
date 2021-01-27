import { getType } from 'typesafe-actions'

import Actions from 'app/actions'
import { Reducer } from 'app/types'
import { UsersAction, UserData } from './types'

export type UsersState = {
  isLoading: boolean
  users: UserData[]
}

const initialState: UsersState = {
  isLoading: true,
  users: [],
}

const usersReducers: Reducer<UsersState, UsersAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.Users.getUsers.request):
      return { ...initialState }
    case getType(Actions.Users.getUsers.success):
      return { isLoading: false, users: action.payload }
    default:
      return state
  }
}

export default usersReducers
