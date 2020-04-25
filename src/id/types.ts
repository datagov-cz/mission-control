export interface ApiResponse {
  success: boolean
  errorId?: string
  errorMessage?: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface RegistrationPayload extends LoginPayload {
  firstName: string
  lastName: string
}

export interface LoginResponse extends ApiResponse {
  loggedIn: boolean
}

export interface LoginSuccessPayload {
  jwt: string
}

export interface Identity {
  uri: string
  types: string[]
  username: string
  firstName: string
  lastName: string
}
