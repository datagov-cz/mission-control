import { Route } from 'app/types'
import MainLayout from 'app/components/MainLayout'
import Users from './components/Users'

const UsersRoutes = {
  Users: 'users',
} as const

export default UsersRoutes

export const UsersRoutesConfiguration: Route[] = [
  {
    name: UsersRoutes.Users,
    path: '/users',
    layout: MainLayout,
    component: Users,
    admin: true,
  },
]
