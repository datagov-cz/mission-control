export type IdAction = import('id/actions').IdAction

export type ApiResponse = {
  success: boolean
  errorId?: string
  errorMessage?: string
}

export type LoginPayload = {
  username: string
  password: string
}

export type UserNames = {
  firstName: string
  lastName: string
}

export type RegistrationPayload = LoginPayload & UserNames

export type LoginResponse = ApiResponse & {
  loggedIn: boolean
}

export interface Identity {
  uri: string
  types: string[]
  username: string
  firstName: string
  lastName: string
}
