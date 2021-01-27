import { Route } from 'app/types'
import MainLayout from 'app/components/MainLayout'
import Workspaces from './components/Workspaces'
import WorkspaceDetail from './components/WorkspaceDetail'

const WorkspacesRoutes = {
  Workspaces: 'workspaces',
  WorkspacesList: 'workspaces.list',
  WorkspaceDetail: 'workspaces.detail',
} as const

export default WorkspacesRoutes

export const WorkspacesRoutesConfiguration: Route[] = [
  {
    name: WorkspacesRoutes.Workspaces,
    path: '/workspaces',
    layout: MainLayout,
    forwardTo: WorkspacesRoutes.WorkspacesList,
  },
  {
    name: WorkspacesRoutes.WorkspacesList,
    path: '/',
    component: Workspaces,
  },
  {
    name: WorkspacesRoutes.WorkspaceDetail,
    path: '/:id',
    component: WorkspaceDetail,
  },
]
