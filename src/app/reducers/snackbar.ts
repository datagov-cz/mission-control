import { getType } from 'typesafe-actions'
import { v4 as uuid } from 'uuid'

import { Reducer, SnackbarAction, SnackbarContent } from 'app/types'
import Actions from 'app/actions'

export interface SnackbarState extends SnackbarContent {
  id: string
}

const initialState: SnackbarState = {
  message: '',
  type: 'info',
  id: '',
}

const appReducers: Reducer<SnackbarState, SnackbarAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.Snackbar.message):
      return { ...state, snackbar: { id: uuid(), ...action.payload } }
    default:
      return state
  }
}

export default appReducers
