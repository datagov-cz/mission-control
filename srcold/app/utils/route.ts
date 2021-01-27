import { RouteName, Route } from 'app/types'
import { RoutesConfiguration } from 'app/routes'
import { ComponentType } from 'react'

const ROUTE_SEPARATOR = '.'

const getRoutesHierarchy = (routeName: RouteName): Route[] =>
  routeName
    .split(ROUTE_SEPARATOR)
    .reduce<{ routePrefix: string; routes: Route[] }>(
      (acc, chunk) => {
        const routeName =
          acc.routePrefix.length > 0
            ? `${acc.routePrefix}${ROUTE_SEPARATOR}${chunk}`
            : chunk
        const routeData = RoutesConfiguration.find(
          (routeCandidate) => routeCandidate.name === routeName
        )

        return {
          routePrefix: routeName,
          routes: routeData ? acc.routes.concat(routeData) : acc.routes,
        }
      },
      { routePrefix: '', routes: [] }
    ).routes

export const getTopRoute = (routeName: RouteName): Route =>
  getRoutesHierarchy(routeName)[0]

export const getComponentsHierarchy = (routeName: RouteName): ComponentType[] =>
  getRoutesHierarchy(routeName).reduce<ComponentType[]>((acc, routeData) => {
    if (routeData?.layout) {
      acc.push(routeData.layout)
    }
    if (routeData?.component) {
      acc.push(routeData.component)
    }
    return acc
  }, [])

export const isRouteAdminOnly = (routeName: RouteName): boolean =>
  !!getRoutesHierarchy(routeName).find((route) => route.admin === true)

export const isRouteAccessible = (routeName: RouteName, isAdmin: boolean) =>
  !isRouteAdminOnly(routeName) || isAdmin
