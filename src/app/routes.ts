import { RouteDefinition } from '@types'
import MainLayout from 'components/MainLayout'
import Workspaces from 'components/workspaces/Workspaces'
import Workspace from 'components/workspaces/Workspace'
import { fetchWorkspace, fetchWorkspaces } from 'data/workspaces'
import {
  fetchVocabularies,
  fetchWorkspaceVocabularies,
} from 'data/vocabularies'

const Routes = {
  Workspaces: 'workspaces',
  Workspace: 'workspace',
} as const

export default Routes

export const RoutesConfiguration: RouteDefinition[] = [
  {
    name: Routes.Workspaces,
    path: '/',
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
