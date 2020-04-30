import { createSelector } from 'reselect'
import { getUsers as getState } from 'app/selectors'

export const getUsersLoading = createSelector(
  getState,
  (state) => state.isLoading
)

export const getUsers = createSelector(getState, (state) => state.users)
