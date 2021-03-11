import { RouteDefinition } from '@types'
import MainLayout from 'components/MainLayout'
import MyWorkspaces from 'components/workspaces/MyWorkspaces'
import Workspaces from 'components/workspaces/Workspaces'
import Workspace from 'components/workspaces/Workspace'
import { fetchWorkspace, fetchWorkspaces } from 'data/workspaces'
import {
  fetchVocabularies,
  fetchWorkspaceVocabularies,
} from 'data/vocabularies'

const Routes = {
  Default: 'default',
  MyWorkspaces: 'my-workspaces',
  Workspaces: 'workspaces',
  Workspace: 'workspace',
} as const

export default Routes

export const RoutesConfiguration: RouteDefinition[] = [
  {
    name: Routes.Default,
    path: '/',
    forwardTo: Routes.MyWorkspaces,
  },
  {
    name: Routes.MyWorkspaces,
    path: '/my-workspaces',
    layout: MainLayout,
    component: MyWorkspaces,
    onEnter: () => fetchWorkspaces(),
  },
  {
    name: Routes.Workspaces,
    path: '/workspaces',
    layout: MainLayout,
    component: Workspaces,
    onEnter: () => fetchWorkspaces(),
  },
  {
    name: Routes.Workspace,
    path: '/workspace/:id',
    layout: MainLayout,
    component: Workspace,
    onEnter: ({ route }) => {
      fetchWorkspace(route.params.id)
      fetchWorkspaceVocabularies(route.params.id)
      fetchVocabularies()
    },
  },
]
