import { createAction, ActionType } from 'typesafe-actions'

import { Locale } from 'app/types'

const AppActions = {
  init: createAction('app/init')(),
  initFinished: createAction('app/initFinished')(),
  setLocale: createAction('app/setLocale')<Locale>(),
}

export type AppAction = ActionType<typeof AppActions>

export default AppActions
