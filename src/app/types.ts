import { Reducer as ReduxReducer } from 'redux'
import { Epic as ObservableEpic } from 'redux-observable'

export type Action = import('app/actions').Action

export type State = import('app/store').State

export type Reducer<LocalState> = ReduxReducer<LocalState, Action>

export type Epic = ObservableEpic<Action, Action, State>

export type SnackbarType = 'error' | 'warning' | 'info' | 'success'

export type SnackbarMessage = string

export type SnackbarContent = {
  message: SnackbarMessage
  type: SnackbarType
}
