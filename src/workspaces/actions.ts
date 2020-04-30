import { createAsyncAction, ActionType } from 'typesafe-actions'
import { Workspace } from './types'

const WorkspacesActions = {
  getWorkspaces: createAsyncAction(
    'workspaces/getWorkspacesRequest',
    'workspaces/getWorkspacesSuccess',
    'workspaces/getWorkspacesFailure'
  )<void, Workspace[], Error>(),
}

export type WorkspacesAction = ActionType<typeof WorkspacesActions>

export default WorkspacesActions
