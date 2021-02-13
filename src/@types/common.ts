import { ComponentType } from 'react'
import { Route as Router5Route } from 'router5'
import i18n from 'i18n'
import Routes from 'app/routes'

export type Locale = keyof typeof i18n

export type Iri = string

export type Id = string

export type MessageType = 'error' | 'warning' | 'info' | 'success'

export type MessageKey = string

export type Message = {
  type: MessageType
  message: MessageKey
}

export type RouteDefinition = Router5Route & {
  name: string
  layout?: ComponentType
  component?: ComponentType
  onEnter?: (transition: RouteTransition) => void
}

export type RouteName = typeof Routes[keyof typeof Routes]

export type Route = {
  name: RouteName
  params: Record<string, string>
  path: string
}

export type RouteTransition = {
  route: Route
  previousRoute: Route | null
}

type Component<T = {}> = {
  name: string
  url: string
  meta: T
}

export type Components = {
  sgovServer: Component
  dbServer: Component
  authServer: Component
  ontographer: Component<{ workspacePath: string }>
  termitServer: Component
  termit: Component<{ workspacePath: string }>
  missionControl: Component
  issueTracker: Component<{ newBug: string; newFeature: string }>
}
