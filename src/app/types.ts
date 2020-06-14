import { ComponentType } from 'react'
import { Reducer as ReduxReducer } from 'redux'
import { Epic as ObservableEpic } from 'redux-observable'
import { Route as Router5Route, NavigationOptions } from 'router5'

import Routes from 'app/routes'
import translations from 'app/translations'

export type Action = import('app/actions').Action

export type AppAction = import('app/actions/app').AppAction

export type RouterAction = import('app/actions/router').RouterAction

export type SnackbarAction = import('app/actions/snackbar').SnackbarAction

export type State = import('app/reducers').State

export type Reducer<
  LocalState,
  LocalAction extends Action = Action
> = ReduxReducer<LocalState, LocalAction>

export type Epic = ObservableEpic<Action, Action, State>

export type Uri = string

export type Id = string

export type Route = Router5Route & {
  name: string
  layout?: ComponentType
  component?: ComponentType
  admin?: boolean
}

export type RouteName = typeof Routes[keyof typeof Routes]

export type NavigateToPayload = {
  name: string
  params: Record<string, any>
  opts: NavigationOptions
}

export type SnackbarType = 'error' | 'warning' | 'info' | 'success'

export type SnackbarMessage = string

export type SnackbarContent = {
  message: SnackbarMessage
  type: SnackbarType
}

export type Locale = keyof typeof translations
