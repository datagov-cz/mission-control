import { useRoute as useRouter5Route } from 'react-router5'
import { constants } from 'router5'

import { RouteName } from '@types'
import { getComponentsHierarchy, getTopRoute } from 'utils/route'

import { Error404 } from 'components/Errors'

const useRoute = () => {
  const route = useRouter5Route()

  const routeName = route.route.name as RouteName
  const componentCandidates = getComponentsHierarchy(routeName)

  const is404 = route.route.name === constants.UNKNOWN_ROUTE

  const components = is404 ? [Error404] : componentCandidates

  const topRoute = getTopRoute(routeName)

  return {
    ...route,
    topRoute,
    components,
  }
}

export default useRoute
