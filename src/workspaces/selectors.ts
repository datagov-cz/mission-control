import { createSelector } from 'reselect'
import { values } from 'lodash'

import { getWorkspaces as getState, getRoute } from 'app/selectors'
import { convertUserDataToUser } from 'users/selectors'

import { WorkspaceData, Workspace } from './types'
import getIdFromUri from 'app/utils/getIdFromUri'

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
  id: getIdFromUri(rest.uri),
  author: convertUserDataToUser(author),
  lastEditor: lastEditor && convertUserDataToUser(lastEditor),
  created: convertUnixTimestampToDate(created),
  lastModified:
    lastModified !== undefined
      ? convertUnixTimestampToDate(lastModified)
      : undefined,
})

export const getWorkspaces = createSelector(getState, (state) =>
  values(state.workspaces).map(convertWorkspaceDataToWorkspace)
)

export const getIsAddWorkspaceFormOpen = createSelector(
  getState,
  (state) => state.isAddWorkspaceFormOpen
)

export const getIsEditWorkspaceFormOpen = createSelector(
  getState,
  (state) => state.isEditWorkspaceFormOpen
)

export const getIsDeleteWorkspaceFormOpen = createSelector(
  getState,
  (state) => state.isDeleteWorkspaceFormOpen
)

export const getWorkspace = createSelector(
  getState,
  getRoute,
  (state, route) => {
    const workspaceDataCandidate = state.workspaces[route?.params.id]
    return workspaceDataCandidate
      ? convertWorkspaceDataToWorkspace(workspaceDataCandidate)
      : undefined
  }
)
