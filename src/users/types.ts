export type UsersAction = import('users/actions').UsersAction

export type User = {
  uri: string
  types: string[]
  username: string
  firstName: string
  lastName: string
}
