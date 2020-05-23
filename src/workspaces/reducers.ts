import { getType } from 'typesafe-actions'

import Actions from 'app/actions'
import { Reducer } from 'app/types'
import { WorkspaceData, WorkspacesAction } from './types'

export type WorkspacesState = {
  isLoading: boolean
  isAddWorkspaceFormOpen: boolean
  workspaces: WorkspaceData[]
}

const initialState: WorkspacesState = {
  isLoading: true,
  isAddWorkspaceFormOpen: false,
  workspaces: [],
}

const workspacesReducers: Reducer<WorkspacesState, WorkspacesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.Workspaces.getWorkspaces.request):
      return { ...state, isLoading: true, workspaces: [] }
    case getType(Actions.Workspaces.getWorkspaces.success):
      return { ...state, isLoading: false, workspaces: action.payload }
    case getType(Actions.Workspaces.openAddWorkspaceForm):
      return { ...state, isAddWorkspaceFormOpen: action.payload }
    default:
      return state
  }
}

export default workspacesReducers
