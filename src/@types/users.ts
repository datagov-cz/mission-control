export type UserData = {
  uri: string
  types?: string[]
  id: string
  firstName: string
  lastName: string
}

export type User = UserData & {
  initials: string
}
