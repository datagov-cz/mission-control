import { combineReducers } from 'redux'
import { State as Router5State } from 'router5'
import { router5Reducer } from 'redux-router5'

import appReducers, { AppState } from './app'
import snackbarReducers, { SnackbarState } from './snackbar'
import idReducers, { IdState } from 'id/reducers'
import usersReducers, { UsersState } from 'users/reducers'
import workspacesReducers, { WorkspacesState } from 'workspaces/reducers'

/**
 * For some reason the redux-router5 package does not export the type definition
 */
interface Router5ReducerState {
  route: Router5State | null
  previousRoute: Router5State | null
  transitionRoute: Router5State | null
  transitionError: any | null
}

export interface State {
  router: Router5ReducerState
  app: AppState
  snackbar: SnackbarState
  id: IdState
  users: UsersState
  workspaces: WorkspacesState
}

const reducer = combineReducers<State>({
  router: router5Reducer,
  app: appReducers,
  snackbar: snackbarReducers,
  id: idReducers,
  users: usersReducers,
  workspaces: workspacesReducers,
})

export default reducer
