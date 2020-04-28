import { Route } from 'app/types'
import DashboardRoutes, { DashboardRoutesConfiguration } from 'dashboard/routes'
import UsersRoutes, { UsersRoutesConfiguration } from 'users/routes'
import IdRoutes, { IdRoutesConfiguration } from 'id/routes'

/**
 * It would be better to define the routes as enums and merge them,
 * but unfortunately TypeScript does not support that (yet), and the next
 * best option is to make the string literals as const so that the final
 * object is read only and the route paths are displayed in autosuggest
 * components in editors
 */
const Routes = {
  ...DashboardRoutes,
  ...UsersRoutes,
  ...IdRoutes,
} as const

export default Routes

export const RoutesConfiguration: Route[] = [
  ...DashboardRoutesConfiguration,
  ...IdRoutesConfiguration,
  ...UsersRoutesConfiguration,
]
