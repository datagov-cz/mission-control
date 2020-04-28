import { ComponentType } from 'react'
import { useRoute as useRouter5Route } from 'react-router5'
import { RoutesConfiguration } from 'app/routes'
import { Route } from 'app/types'

const ROUTE_SEPARATOR = '.'

type AccType = {
  routeName: string
  components: ComponentType[]
}

const getComponentsHierarchy = (routeName: string): ComponentType[] =>
  routeName
    .split(ROUTE_SEPARATOR)
    .reduce<{ routePrefix: string; components: ComponentType[] }>(
      (acc, chunk) => {
        const routeName =
          acc.routePrefix.length > 0
            ? `${acc.routePrefix}${ROUTE_SEPARATOR}${chunk}`
            : chunk
        const routeData = RoutesConfiguration.find(
          (routeCandidate) => routeCandidate.name === routeName
        )

        const newComponents = []
        if (routeData?.layout) {
          newComponents.push(routeData.layout)
        }
        if (routeData?.component) {
          newComponents.push(routeData.component)
        }

        return {
          routePrefix: routeName,
          components: acc.components.concat(newComponents),
        }
      },
      { routePrefix: '', components: [] }
    ).components

const useRoute = () => {
  const route = useRouter5Route()

  const components = getComponentsHierarchy(route.route.name)

  const topRouteName = route.route.name.split(ROUTE_SEPARATOR)[0]
  const topRoute = RoutesConfiguration.find(
    (route) => route.name === topRouteName
  ) as Route
  return {
    ...route,
    topRoute,
    components,
  }
}

export default useRoute
