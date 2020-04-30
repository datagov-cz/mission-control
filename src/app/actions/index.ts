import AppActions, { AppAction } from './app'
import SnackbarActions, { SnackbarAction } from './snackbar'
import RouterActions, { RouterAction } from './router'
import IdActions, { IdAction } from 'id/actions'
import UsersActions, { UsersAction } from 'users/actions'
import WorkspacesActions, { WorkspacesAction } from 'workspaces/actions'

const Actions = {
  App: AppActions,
  Snackbar: SnackbarActions,
  Router: RouterActions,
  Id: IdActions,
  Users: UsersActions,
  Workspaces: WorkspacesActions,
}

export type Action =
  | AppAction
  | SnackbarAction
  | RouterAction
  | IdAction
  | UsersAction
  | WorkspacesAction

export default Actions
