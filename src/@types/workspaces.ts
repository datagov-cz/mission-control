import { UserData, User } from '@types'
import { Id, Iri } from '@types'

export type BaseVocabularyData = {
  basedOnVocabularyVersion: Iri
  label: string
}

export type BaseVocabulary = {
  vocabulary: Iri
  label: string
}

export type BaseVocabularyWithWorkspace = BaseVocabulary & {
  workspace?: Workspace
}

export type VocabularyData = BaseVocabularyData & {
  uri: Iri
  types: Iri[]
  changeTrackingContext: {
    uri: Iri
    changesVocabularyVersion: Iri
  }
}

export type Vocabulary = Omit<
  VocabularyData,
  'types' | 'basedOnVocabularyVersion' | 'changeTrackingContext'
> & {
  id: Id
  vocabulary: Iri
  isReadOnly: boolean
  vocabularyContext: Iri
  changeTrackingContext: Iri
  changeTrackingVocabulary: Iri
}

export type AddVocabularyPayload = {
  workspaceId: Id
  vocabularyIri: Iri
  label?: string
}

export type DeleteVocabularyPayload = {
  workspaceId: Id
  vocabularyId: Id
}

export type UpdateVocabularyPayload = {
  workspace: Workspace
  vocabulary: Vocabulary
}

export type AddWorkspacePayload = {
  label: string
}

export type EditWorkspacePayload = AddWorkspacePayload & {
  uri: Iri
}

export type DeleteWorkspacePayload = EditWorkspacePayload

export type PublishWorkspacePayload = EditWorkspacePayload

export type PRUri = string

export type WorkspaceData = {
  uri: Iri
  label: string
  author: UserData
  lastEditor?: UserData
  created: number
  lastModified?: number
  vocabularyContexts: VocabularyData[]
}

export type Workspace = Omit<
  WorkspaceData,
  'author' | 'lastEditor' | 'created' | 'lastModified' | 'vocabularyContexts'
> & {
  id: Id
  author: User
  lastEditor?: User
  created: Date
  lastModified?: Date
  vocabularies: Vocabulary[]
}

export type Tool = {
  url: string
  label: string
  key: string
}
