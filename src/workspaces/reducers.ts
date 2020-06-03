import { getType } from 'typesafe-actions'

import Actions from 'app/actions'
import { Reducer } from 'app/types'
import {Tool, WorkspaceData, WorkspacesAction} from './types'
import normalize from 'app/utils/normalize'
import tools from 'tools.json'
import {zipObject} from "lodash";

export type WorkspacesState = {
  isLoading: boolean
  isAddWorkspaceFormOpen: boolean
  isEditWorkspaceFormOpen: boolean
  isDeleteWorkspaceFormOpen: boolean
  isAddVocabularyFormOpen: boolean
  workspaces: Record<string, WorkspaceData>
  tools: Record<string, Tool>
}

const initialState: WorkspacesState = {
  isLoading: true,
  isAddWorkspaceFormOpen: false,
  isEditWorkspaceFormOpen: false,
  isDeleteWorkspaceFormOpen: false,
  isAddVocabularyFormOpen: false,
  workspaces: {},
  tools: zipObject(tools.map( t => t.url ), tools)
}

const workspacesReducers: Reducer<WorkspacesState, WorkspacesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.Workspaces.getWorkspaces.request):
    case getType(Actions.Workspaces.getWorkspace.request):
      return { ...state, isLoading: true, workspaces: {} }
    case getType(Actions.Workspaces.getWorkspaces.success):
      return {
        ...state,
        isLoading: false,
        workspaces: normalize(action.payload),
      }
    case getType(Actions.Workspaces.getWorkspace.success):
      return {
        ...state,
        isLoading: false,
        workspaces: normalize([action.payload]),
      }
    case getType(Actions.Workspaces.openAddWorkspaceForm):
      return { ...state, isAddWorkspaceFormOpen: action.payload }
    case getType(Actions.Workspaces.openEditWorkspaceForm):
      return { ...state, isEditWorkspaceFormOpen: action.payload }
    case getType(Actions.Workspaces.openDeleteWorkspaceForm):
      return { ...state, isDeleteWorkspaceFormOpen: action.payload }
    case getType(Actions.Workspaces.openAddVocabularyForm):
      return { ...state, isAddVocabularyFormOpen: action.payload }
    default:
      return state
  }
}

export default workspacesReducers
