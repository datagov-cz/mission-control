import { createStore, compose, Store, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { router5Middleware } from 'redux-router5'

import Actions, { Action } from './actions'
import reducer, { State } from './reducers'
import epic from './epics'
import router from './router'

const epicMiddleware = createEpicMiddleware<Action, Action, State>()

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
    composeEnhancers(applyMiddleware(router5Middleware(router), epicMiddleware))
  )

const store = configureStore()

epicMiddleware.run(epic)
store.dispatch(Actions.App.init())

export default store
