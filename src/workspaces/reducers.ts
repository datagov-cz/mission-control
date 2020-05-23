import { getType } from 'typesafe-actions'

import Actions from 'app/actions'
import { Reducer } from 'app/types'
import { WorkspaceData, WorkspacesAction } from './types'

export type WorkspacesState = {
  isLoading: boolean
  workspaces: WorkspaceData[]
}

const initialState: WorkspacesState = {
  isLoading: true,
  workspaces: [],
}

const workspacesReducers: Reducer<WorkspacesState, WorkspacesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.Workspaces.getWorkspaces.request):
      return { ...initialState }
    case getType(Actions.Workspaces.getWorkspaces.success):
      return { isLoading: false, workspaces: action.payload }
    default:
      return state
  }
}

export default workspacesReducers
