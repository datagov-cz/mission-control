import { Id } from 'app/types'

/**
 * Endpoint to fetch workspaces and create a workspace
 */
export const getWorkspacesUrl = () => '/workspaces'

/**
 * Endpoint to fetch one workspace
 */
export const getWorkspaceUrl = (id: Id) => `${getWorkspacesUrl()}/${id}`
