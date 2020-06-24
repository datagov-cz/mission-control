import { Id, Uri } from 'app/types'

/**
 * Endpoint to fetch workspaces and create a workspace
 */
export const getWorkspacesUrl = () => '/workspaces'

/**
 * Endpoint to fetch one workspace
 */
export const getWorkspaceUrl = (id: Id) => `${getWorkspacesUrl()}/${id}`

/**
 * Endpoint to fetch a list of vocabularies for a particular workspace
 */
export const getVocabulariesUrl = (workspaceId: Id) =>
  `${getWorkspaceUrl(workspaceId)}/vocabularies`

/**
 * Endpoint to create a vocabulary in a workspace
 */
export const getAddVocabularyUrl = (
  workspaceId: Id,
  vocabularyUri: Uri,
  readOnly: boolean
) =>
  `${getVocabulariesUrl(
    workspaceId
  )}?vocabularyUri=${vocabularyUri}&readOnly=${String(readOnly)}`

/**
 * Endpoint to delete vocabulary from a workspace
 */
export const getVocabularyUrl = (workspaceId: Id, vocabularyId: Id) =>
  `${getVocabulariesUrl(workspaceId)}/${vocabularyId}`
