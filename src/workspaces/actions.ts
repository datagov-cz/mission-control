import { createAsyncAction, ActionType, createAction } from 'typesafe-actions'
import {
  WorkspaceData,
  AddWorkspacePayload,
  EditWorkspacePayload,
  DeleteWorkspacePayload,
} from './types'
import { Id } from 'app/types'

const WorkspacesActions = {
  getWorkspaces: createAsyncAction(
    'workspaces/getWorkspacesRequest',
    'workspaces/getWorkspacesSuccess',
    'workspaces/getWorkspacesFailure'
  )<void, WorkspaceData[], Error>(),
  openAddWorkspaceForm: createAction('workspaces/openAddWorkspaceForm')<
    boolean
  >(),
  openEditWorkspaceForm: createAction('workspaces/openEditWorkspaceForm')<
    boolean
  >(),
  openDeleteWorkspaceForm: createAction('workspaces/openDeleteWorkspaceForm')<
    boolean
  >(),
  addWorkspace: createAsyncAction(
    'workspaces/addWorkspaceRequest',
    'workspaces/addWorkspaceSuccess',
    'workspaces/addWorkspaceFailure'
  )<AddWorkspacePayload, void, Error>(),
  editWorkspace: createAsyncAction(
    'workspaces/editWorkspaceRequest',
    'workspaces/editWorkspaceSuccess',
    'workspaces/editWorkspaceFailure'
  )<EditWorkspacePayload, EditWorkspacePayload, Error>(),
  deleteWorkspace: createAsyncAction(
    'workspaces/deleteWorkspaceRequest',
    'workspaces/deleteWorkspaceSuccess',
    'workspaces/deleteWorkspaceFailure'
  )<DeleteWorkspacePayload, DeleteWorkspacePayload, Error>(),
  getWorkspace: createAsyncAction(
    'workspaces/getWorkspaceRequest',
    'workspaces/getWorkspaceSuccess',
    'workspaces/getWorkspaceFailure'
  )<Id, WorkspaceData, Error>(),
}

export type WorkspacesAction = ActionType<typeof WorkspacesActions>

export default WorkspacesActions
