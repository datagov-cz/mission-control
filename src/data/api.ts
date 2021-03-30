import { Id, Iri } from '@types'

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
  vocabularyIri: Iri,
  label?: string
) =>
  `${getWorkspaceVocabulariesUrl(
    workspaceId
  )}?vocabularyUri=${vocabularyIri}&readOnly=false&label=${label}`

/**
 * Endpoint to delete vocabulary from a workspace
 */
export const getVocabularyUrl = (workspaceId: Id, vocabularyId: Id) =>
  `${getWorkspaceVocabulariesUrl(workspaceId)}/${vocabularyId}`
