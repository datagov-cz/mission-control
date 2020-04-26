import { getType } from 'typesafe-actions'
import { v4 as uuid } from 'uuid'

import { Reducer, SnackbarContent } from 'app/types'
import Actions from 'app/actions'

export interface SnackbarState extends SnackbarContent {
  id: string
}

export interface AppState {
  loading: boolean
  snackbar: SnackbarState
}

const initialState: AppState = {
  loading: true,
  snackbar: {
    message: '',
    type: 'info',
    id: '',
  },
}

const appReducers: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case getType(Actions.App.initFinished):
      return { ...state, loading: false }
    case getType(Actions.App.message):
      return { ...state, snackbar: { id: uuid(), ...action.payload } }
    default:
      return state
  }
}

export default appReducers
