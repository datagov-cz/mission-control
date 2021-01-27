import { User } from './types'
import { getUriFragment } from 'app/utils/uri'

/**
 * Endpoint to fetch users
 */
export const getUsersUrl = () => '/users'

/**
 * Endpoint to activate or deactivate user
 */
export const getUserStatusUrl = (user: User) =>
  `${getUsersUrl()}/${getUriFragment(user.uri)}/status`
