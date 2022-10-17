import { UserData, User } from "./";
import { Id, Iri } from "./";

export type BaseVocabularyData = {
  basedOnVersion: Iri;
  label: string;
};

export type BaseVocabulary = {
  vocabulary: Iri;
  label: string;
};

export type BaseVocabularyWithWorkspace = BaseVocabulary & {
  workspace?: Project;
};

export type VocabularyData = BaseVocabularyData & {
  uri: Iri;
  types: Iri[];
  changeTrackingContext: {
    uri: Iri;
    changesVocabularyVersion: Iri;
  };
};

export type Vocabulary = Omit<
  VocabularyData,
  "types" | "basedOnVersion" | "changeTrackingContext"
> & {
  id: Id;
  vocabulary: Iri;
  isReadOnly: boolean;
  vocabularyContext: Iri;
  changeTrackingContext: Iri;
  changeTrackingVocabulary: Iri;
};

export type AddVocabularyPayload = {
  workspaceId: Id;
  vocabularyIri: Iri;
  label?: string;
};

export type DeleteVocabularyPayload = {
  workspaceId: Id;
  vocabularyIri: Iri;
};

export type UpdateVocabularyPayload = {
  workspace: Project;
  vocabulary: Vocabulary;
};

export type AddWorkspacePayload = {
  label: string;
};

export type EditWorkspacePayload = AddWorkspacePayload & {
  uri: Iri;
};

export type DeleteWorkspacePayload = EditWorkspacePayload;

export type PublishWorkspacePayload = EditWorkspacePayload;

export type PRUri = string;

export type ProjectData = {
  uri: Iri;
  label: string;
  author: UserData;
  lastEditor?: UserData;
  created: number;
  lastModified?: number;
  vocabularyContexts: VocabularyData[];
};

export type Project = Omit<
  ProjectData,
  "author" | "lastEditor" | "created" | "lastModified" | "vocabularyContexts"
> & {
  id: Id;
  author: User;
  lastEditor?: User;
  created: Date;
  lastModified?: Date;
  vocabularies: Vocabulary[];
};
