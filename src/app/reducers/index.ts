import initReducers, { InitState } from './init'
import idReducers, { IdState } from 'id/reducers'

export interface State {
  init: InitState
  id: IdState
}

const reducers = {
  init: initReducers,
  id: idReducers,
}

export default reducers
