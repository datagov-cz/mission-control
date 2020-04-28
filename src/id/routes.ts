import { Route } from 'app/types'
import Login from './components/Login'
import Registration from './components/Registration'
import IdLayout from './components/IdLayout'

const IdRoutes = {
  Login: 'login',
  Registration: 'registration',
} as const

export default IdRoutes

export const IdRoutesConfiguration: Route[] = [
  {
    name: IdRoutes.Login,
    path: '/login',
    layout: IdLayout,
    component: Login,
  },
  {
    name: IdRoutes.Registration,
    path: '/registration',
    layout: IdLayout,
    component: Registration,
  },
]
