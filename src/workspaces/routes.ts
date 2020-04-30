import { Route } from 'app/types'
import MainLayout from 'app/components/MainLayout'
import Workspaces from './components/Workspaces'

const WorkspacesRoutes = {
  Workspaces: 'workspaces',
} as const

export default WorkspacesRoutes

export const WorkspacesRoutesConfiguration: Route[] = [
  {
    name: WorkspacesRoutes.Workspaces,
    path: '/workspaces',
    layout: MainLayout,
    component: Workspaces,
  },
]
