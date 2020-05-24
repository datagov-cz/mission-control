import { UserData, User } from 'users/types'
import { Id, Uri } from 'app/types'

export type WorkspacesAction = import('workspaces/actions').WorkspacesAction

export type VocabularyContextData = {}

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
  vocabularyContexts: VocabularyContextData[]
}

export type Workspace = Omit<
  WorkspaceData,
  'author' | 'lastEditor' | 'created' | 'lastModified'
> & {
  id: Id
  author: User
  lastEditor?: User
  created: Date
  lastModified?: Date
}
