import { createSelector } from 'reselect'

import { getUsers as getState } from 'app/selectors'
import { USER_ADMIN, USER_DEACTIVATED } from 'app/vocabulary'

import { UserData, User } from './types'

export const getUsersLoading = createSelector(
  getState,
  (state) => state.isLoading
)

export const getUsersData = createSelector(getState, (state) => state.users)

export const convertUserDataToUser = (userData: UserData): User => ({
  ...userData,
  initials: `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`,
  isAdmin: userData.types.includes(USER_ADMIN),
  isActive: !userData.types.includes(USER_DEACTIVATED),
})

export const getUsers = createSelector(getUsersData, (usersData) =>
  usersData.map(convertUserDataToUser)
)
