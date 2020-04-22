import { createSelector } from 'reselect'
import { getId as getState } from 'app/selectors'

export const getInitials = createSelector(
  getState,
  ({ firstName, lastName }) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }
)
