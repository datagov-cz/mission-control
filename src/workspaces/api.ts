import { Id, Uri } from 'app/types'

/**
 * Endpoint to fetch existing vocabularies
 */
export const getVocabulariesUrl = () => '/vocabularies'

/**
 * Endpoint to fetch workspaces and create a workspace
 */
export const getWorkspacesUrl = () => '/workspaces'

/**
 * Endpoint to fetch one workspace
 */
export const getWorkspaceUrl = (id: Id) => `${getWorkspacesUrl()}/${id}`

/**
 * Endpoint to publish a workspace
 */
export const getWorkspacePublishUrl = (id: Id) =>
  `${getWorkspaceUrl(id)}/publish`

/**
 * Endpoint to fetch a list of vocabularies for a particular workspace
 */
export const getWorkspaceVocabulariesUrl = (workspaceId: Id) =>
  `${getWorkspaceUrl(workspaceId)}/vocabularies`

/**
 * Endpoint to create a vocabulary in a workspace
 */
export const getAddVocabularyUrl = (
  workspaceId: Id,
  vocabularyUri: Uri,
  readOnly: boolean
) =>
  `${getWorkspaceVocabulariesUrl(
    workspaceId
  )}?vocabularyUri=${vocabularyUri}&readOnly=${String(readOnly)}`

/**
 * Endpoint to delete vocabulary from a workspace
 */
export const getVocabularyUrl = (workspaceId: Id, vocabularyId: Id) =>
  `${getWorkspaceVocabulariesUrl(workspaceId)}/${vocabularyId}`
