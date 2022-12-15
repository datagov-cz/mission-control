import { Id, Iri } from "../@types";

/**
 * Endpoint to fetch existing vocabularies
 */
export const getVocabulariesUrl = () => "/vocabularies";

/**
 * Endpoint to fetch workspaces and create a workspace
 */
export const getProjectsUrl = () => "/workspaces";

/**
 * Endpoint to fetch one workspace
 */
export const getProjectUrl = (id: Id) => `${getProjectsUrl()}/${id}`;

/**
 * Endpoint to publish a workspace
 */
export const getProjectPublishUrl = (id: Id) => `${getProjectUrl(id)}/publish`;

/**
 * Endpoint to fetch a list of vocabularies for a particular workspace
 */
export const getWorkspaceVocabulariesUrl = (workspaceId: Id) =>
  `${getProjectUrl(workspaceId)}/vocabularies`;

/**
 * Endpoint to create a vocabulary in a workspace
 */
export const getAddVocabularyUrl = (
  projectId: Id,
  vocabularyIri: Iri,
  label?: string
) => {
  const query = new URLSearchParams({
    vocabularyUri: vocabularyIri,
    readOnly: "false",
  });
  if (label) {
    query.append("label", label);
  }
  return `${getWorkspaceVocabulariesUrl(projectId)}?${query.toString()}`;
};

/**
 * Endpoint to delete vocabulary from a workspace
 */
export const getVocabularyUrl = (workspaceId: Id, vocabularyId: Id) =>
  `${getWorkspaceVocabulariesUrl(workspaceId)}/${vocabularyId}`;

/**
 * Endpoint to fetch a list of vocabulary dependencies for a particular vocabulary
 */
export const getWorkspaceVocabularyDependenciesUrl = (
  workspaceId: Id,
  vocabularyIri: Iri
) =>
  `${getProjectUrl(workspaceId)}/dependencies?vocabularyIri=${vocabularyIri}`;
