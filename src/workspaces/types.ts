export type WorkspacesAction = import('workspaces/actions').WorkspacesAction

export type Workspace = {
  uri: string
  types: string[]
  name: string
  firstName: string
  lastName: string
}
