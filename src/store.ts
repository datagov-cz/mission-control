import {
  createStore,
  combineReducers,
  compose,
  Store,
  applyMiddleware,
} from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createBrowserHistory } from 'history'
import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from 'connected-react-router'

import { Actions, Action } from './actions'
import reducers, { State as AppState } from './reducers'
import epic from './epics'

export const history = createBrowserHistory()

const reducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
})

export interface State extends AppState {
  router: RouterState
}

const epicMiddleware = createEpicMiddleware<Action, Action, AppState>()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    store: Store<State>
  }
}

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const configureStore = (initialState?: State): Store<State, Action> =>
  createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware))
  )

const store = configureStore()

epicMiddleware.run(epic)
store.dispatch(Actions.Init.initApp())

export default store

if (process.env.NODE_ENV !== 'production') {
  window.store = store
}
