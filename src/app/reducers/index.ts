import appReducers, { AppState } from './app'
import idReducers, { IdState } from 'id/reducers'

export interface State {
  app: AppState
  id: IdState
}

const reducers = {
  app: appReducers,
  id: idReducers,
}

export default reducers
