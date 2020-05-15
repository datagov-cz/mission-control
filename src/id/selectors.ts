import { createSelector } from 'reselect'

import { getId as getState } from 'app/selectors'
import { USER_ADMIN } from 'app/vocabulary'

export const getIdentity = getState

export const getInitials = createSelector(
  getState,
  ({ firstName, lastName }) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }
)

export const getUsername = createSelector(getState, ({ username }) => username)

export const getIsAdmin = createSelector(getState, ({ types }) =>
  types.includes(USER_ADMIN)
)
