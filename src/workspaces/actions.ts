import { createAsyncAction, ActionType, createAction } from 'typesafe-actions'
import {
  WorkspaceData,
  AddWorkspacePayload,
  EditWorkspacePayload,
  DeleteWorkspacePayload,
  PublishWorkspacePayload,
  PRUri,
  AddVocabularyPayload,
  DeleteVocabularyPayload,
} from './types'
import { Id } from 'app/types'
import { Vocabulary } from 'workspaces/types'

const WorkspacesActions = {
  getVocabularies: createAsyncAction(
    'workspaces/getVocabulariesRequest',
    'workspaces/getVocabulariesSuccess',
    'workspaces/getVocabulariesFailure'
  )<void, Vocabulary[], Error>(),
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
  openPublishWorkspaceDialog: createAction(
    'workspaces/openPublishWorkspaceDialog'
  )<boolean>(),
  openAddExistingVocabularyForm: createAction(
    'workspaces/openAddExistingVocabularyForm'
  )<boolean>(),
  openAddVocabularyForm: createAction('workspaces/openAddVocabularyForm')<
    boolean
  >(),
  openDeleteVocabularyForm: createAction('workspaces/openDeleteVocabularyForm')<
    Vocabulary | false
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
  publishWorkspace: createAsyncAction(
    'workspaces/publishWorkspaceRequest',
    'workspaces/publishWorkspaceSuccess',
    'workspaces/publishWorkspaceFailure'
  )<PublishWorkspacePayload, PRUri, Error>(),
  addVocabulary: createAsyncAction(
    'workspaces/addVocabularyRequest',
    'workspaces/addVocabularySuccess',
    'workspaces/addVocabularyFailure'
  )<AddVocabularyPayload, AddVocabularyPayload, Error>(),
  deleteVocabulary: createAsyncAction(
    'workspaces/deleteVocabularyRequest',
    'workspaces/deleteVocabularySuccess',
    'workspaces/deleteVocabularyFailure'
  )<DeleteVocabularyPayload, DeleteVocabularyPayload, Error>(),
}

export type WorkspacesAction = ActionType<typeof WorkspacesActions>

export default WorkspacesActions
