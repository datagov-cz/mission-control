import DashboardRoutes from 'dashboard/routes'
import UsersRoutes from 'users/routes'
import IdRoutes from 'id/routes'
import ErrorsRoutes from 'errors/routes'

/**
 * It would be better to define the routes as enums and merge them,
 * but unfortunately TypeScript does not support that (yet), and the next
 * best option is to make the string literals as const so that the final
 * object is read only and the route paths are displayed in autosuggest
 * components in editors
 */
const Routes = {
  Main: '/',
  ...DashboardRoutes,
  ...UsersRoutes,
  ...IdRoutes,
  ...ErrorsRoutes,
} as const

export default Routes
