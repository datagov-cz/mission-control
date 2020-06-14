import { Route } from 'app/types'
import MainLayout from 'app/components/MainLayout'
import Dashboard from './components/Dashboard'
import WorkspacesRoutes from 'workspaces/routes'

const DashboardRoutes = {
  Dashboard: 'dashboard',
} as const

export default DashboardRoutes

export const DashboardRoutesConfiguration: Route[] = [
  {
    name: DashboardRoutes.Dashboard,
    path: '/',
    layout: MainLayout,
    component: Dashboard,
    forwardTo: WorkspacesRoutes.Workspaces,
  },
]
