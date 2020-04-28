import AppActions, { AppAction } from './app'
import SnackbarActions, { SnackbarAction } from './snackbar'
import RouterActions, { RouterAction } from './router'
import IdActions, { IdAction } from 'id/actions'

const Actions = {
  App: AppActions,
  Snackbar: SnackbarActions,
  Router: RouterActions,
  Id: IdActions,
}

export type Action = AppAction | SnackbarAction | RouterAction | IdAction

export default Actions
