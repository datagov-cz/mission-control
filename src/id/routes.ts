import { Route } from 'app/types'
import Login from './components/Login'
import Registration from './components/Registration'
import IdLayout from './components/IdLayout'
import MeLayout from './components/MeLayout'
import Profile from './components/Profile'
import MainLayout from 'app/components/MainLayout'
import EditProfile from './components/EditProfile'

const IdRoutes = {
  Login: 'login',
  Registration: 'registration',
  Me: 'me',
  MeProfile: 'me.profile',
  MeEdit: 'me.edit',
  MeChangePassword: 'me.changePassword',
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
  {
    name: IdRoutes.Me,
    path: '/me',
    layout: MainLayout,
    forwardTo: IdRoutes.MeProfile,
  },
  {
    name: IdRoutes.MeProfile,
    path: '/profile',
    layout: MeLayout,
    component: Profile,
  },
  {
    name: IdRoutes.MeEdit,
    path: '/edit',
    layout: MeLayout,
    component: EditProfile,
  },
]
