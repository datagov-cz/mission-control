import { useRoute as useRouter5Route } from 'react-router5'
import { constants } from 'router5'
import { RouteName } from 'app/types'
import {
  getComponentsHierarchy,
  getTopRoute,
  isRouteAdminOnly,
} from 'app/utils/route'
import { useSelector } from 'react-redux'
import { getIsAdmin } from 'id/selectors'
import Error404 from 'app/components/Error404'
import Error401 from 'app/components/Error401'

const useRoute = () => {
  const route = useRouter5Route()
  const isAdmin = useSelector(getIsAdmin)

  const routeName = route.route.name as RouteName
  const componentCandidates = getComponentsHierarchy(routeName)

  const is404 = route.route.name === constants.UNKNOWN_ROUTE

  const is401 = isRouteAdminOnly(routeName) && !isAdmin

  const components = is404
    ? [Error404]
    : is401
    ? [Error401]
    : componentCandidates

  const topRoute = getTopRoute(routeName)

  return {
    ...route,
    topRoute,
    components,
  }
}

export default useRoute
