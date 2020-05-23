import { createAsyncAction, ActionType } from 'typesafe-actions'
import { WorkspaceData } from './types'

const WorkspacesActions = {
  getWorkspaces: createAsyncAction(
    'workspaces/getWorkspacesRequest',
    'workspaces/getWorkspacesSuccess',
    'workspaces/getWorkspacesFailure'
  )<void, WorkspaceData[], Error>(),
}

export type WorkspacesAction = ActionType<typeof WorkspacesActions>

export default WorkspacesActions
