const JWT_KEY = 'JWT'

export const setToken = (jwt: string): void =>
  localStorage.setItem(JWT_KEY, `Bearer ${jwt}`)

export const getToken = (): string => localStorage.getItem(JWT_KEY) || ''

export const removeToken = (): void => localStorage.removeItem(JWT_KEY)
