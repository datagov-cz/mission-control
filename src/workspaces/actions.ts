import { createAsyncAction, ActionType, createAction } from 'typesafe-actions'
import { WorkspaceData, AddWorkspacePayload } from './types'

const WorkspacesActions = {
  getWorkspaces: createAsyncAction(
    'workspaces/getWorkspacesRequest',
    'workspaces/getWorkspacesSuccess',
    'workspaces/getWorkspacesFailure'
  )<void, WorkspaceData[], Error>(),
  openAddWorkspaceForm: createAction('workspaces/openAddWorkspaceForm')<
    boolean
  >(),
  addWorkspace: createAsyncAction(
    'workspaces/addWorkspaceRequest',
    'workspaces/addWorkspaceSuccess',
    'workspaces/addWorkspaceFailure'
  )<AddWorkspacePayload, void, Error>(),
}

export type WorkspacesAction = ActionType<typeof WorkspacesActions>

export default WorkspacesActions
