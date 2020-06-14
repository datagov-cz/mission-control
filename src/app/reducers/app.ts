import { getType } from 'typesafe-actions'

import { Reducer, AppAction, Locale } from 'app/types'
import Actions from 'app/actions'
import { getLocale } from 'app/utils/i18n'

export interface AppState {
  initFinished: boolean
  locale: Locale
}

const initialState: AppState = {
  initFinished: false,
  locale: getLocale(),
}

const appReducers: Reducer<AppState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.App.initFinished):
      return { ...state, initFinished: true }
    case getType(Actions.App.setLocale):
      return { ...state, locale: action.payload }
    default:
      return state
  }
}

export default appReducers
