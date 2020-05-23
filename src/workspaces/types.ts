import { UserData, User } from 'users/types'
import Users from 'users/components/Users'
import Workspaces from './components/Workspaces'

export type WorkspacesAction = import('workspaces/actions').WorkspacesAction

export type VocabularyContextData = {}

export type WorkspaceData = {
  uri: string
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
  author: User
  lastEditor?: User
  created: Date
  lastModified?: Date
}
