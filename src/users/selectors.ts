import { createSelector } from 'reselect'

import { getUsers as getState } from 'app/selectors'
import { USER_ADMIN, USER_DEACTIVATED } from 'app/vocabulary'

import { User } from './types'

export const getUsersLoading = createSelector(
  getState,
  (state) => state.isLoading
)

export const getUsersData = createSelector(getState, (state) => state.users)

export const getUsers = createSelector(getUsersData, (usersData) =>
  usersData.map((userData) => {
    const user: User = {
      ...userData,
      isAdmin: userData.types.includes(USER_ADMIN),
      isActive: !userData.types.includes(USER_DEACTIVATED),
    }
    return user
  })
)
