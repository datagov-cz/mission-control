import { createSelector } from 'reselect'
import { getWorkspaces as getState } from 'app/selectors'

export const getWorkspacesLoading = createSelector(
  getState,
  (state) => state.isLoading
)

export const getWorkspaces = createSelector(
  getState,
  (state) => state.workspaces
)
