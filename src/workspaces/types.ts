import { UserData, User } from 'users/types'
import { Id, Uri } from 'app/types'

export type WorkspacesAction = import('workspaces/actions').WorkspacesAction

export type VocabularyData = {
  uri: Uri
  label?: string
  types: Uri[]
  basedOnVocabularyVersion: Uri
  changeTrackingContext: {
    uri: Uri
    changesVocabularyVersion: Uri
  }
}

export type Vocabulary = Omit<
  VocabularyData,
  'types' | 'basedOnVocabularyVersion' | 'changeTrackingContext'
> & {
  vocabulary: Uri
  isReadOnly: boolean
  vocabularyContext: Uri
  changeTrackingContext: Uri
  changeTrackingVocabulary: Uri
}

export type AddVocabularyPayload = {
  workspaceUri: Uri
  vocabularyUri: Uri
  readOnly: boolean
}

export type AddWorkspacePayload = {
  label: string
}

export type EditWorkspacePayload = AddWorkspacePayload & {
  uri: Uri
}

export type DeleteWorkspacePayload = EditWorkspacePayload

export type WorkspaceData = {
  uri: Uri
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
}
