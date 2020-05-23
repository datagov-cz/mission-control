import { createSelector } from 'reselect'

import { getWorkspaces as getState } from 'app/selectors'
import { convertUserDataToUser } from 'users/selectors'

import { WorkspaceData, Workspace } from './types'

export const getWorkspacesLoading = createSelector(
  getState,
  (state) => state.isLoading
)

const convertUnixTimestampToDate = (timestamp: number) => new Date(timestamp)

const convertWorkspaceDataToWorkspace = ({
  author,
  lastEditor,
  created,
  lastModified,
  ...rest
}: WorkspaceData): Workspace => ({
  ...rest,
  author: convertUserDataToUser(author),
  lastEditor: lastEditor && convertUserDataToUser(lastEditor),
  created: convertUnixTimestampToDate(created),
  lastModified:
    lastModified !== undefined
      ? convertUnixTimestampToDate(lastModified)
      : undefined,
})

export const getWorkspaces = createSelector(getState, (state) =>
  state.workspaces.map(convertWorkspaceDataToWorkspace)
)

export const getIsAddWorkspaceFormOpen = createSelector(
  getState,
  (state) => state.isAddWorkspaceFormOpen
)
