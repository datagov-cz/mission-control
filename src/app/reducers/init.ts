import { Reducer } from 'redux'
import { getType } from 'typesafe-actions'

import { Actions, Action } from 'app/actions'

export interface InitState {
  loading: boolean
}

const initialState: InitState = {
  loading: true,
}

const initReducers: Reducer<InitState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.Init.initAppFinished):
      return { loading: false }
    default:
      return state
  }
}

export default initReducers
