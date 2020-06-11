export type UsersAction = import('users/actions').UsersAction

export type UserData = {
  uri: string
  types?: string[]
  username: string
  firstName: string
  lastName: string
}

export type User = UserData & {
  initials: string
  isAdmin: boolean
  isActive: boolean
}
