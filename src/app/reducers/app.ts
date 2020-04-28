import { getType } from 'typesafe-actions'

import { Reducer, AppAction } from 'app/types'
import Actions from 'app/actions'

export interface AppState {
  initFinished: boolean
}

const initialState: AppState = {
  initFinished: false,
}

const appReducers: Reducer<AppState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.App.initFinished):
      return { initFinished: true }
    default:
      return state
  }
}

export default appReducers
