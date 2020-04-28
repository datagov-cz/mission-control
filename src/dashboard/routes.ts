import { Route } from 'app/types'
import MainLayout from 'app/components/MainLayout'
import Dashboard from './components/Dashboard'

const DashboardRoutes = {
  Dashboard: 'dashboard',
} as const

export default DashboardRoutes

export const DashboardRoutesConfiguration: Route[] = [
  {
    name: DashboardRoutes.Dashboard,
    path: '/dashboard',
    layout: MainLayout,
    component: Dashboard,
  },
]
