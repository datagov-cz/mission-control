/**
 * Endpoint for logging the user in
 */
export const LOGIN_URL = '/j_spring_security_check'

/**
 * Endpoint to fetch current authenticated user identity
 */
export const MY_ID_URL = '/rest/users/current'

/**
 * Endpoint to check whether the username already exists, returns boolean
 */
export const USERNAME_EXISTS_URL = '/rest/users/username?username='

/**
 * Endpoint for registering the user
 */
export const REGISTRATION_URL = '/rest/users'
