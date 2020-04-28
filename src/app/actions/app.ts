import { createAction, ActionType } from 'typesafe-actions'

const AppActions = {
  init: createAction('app/init')(),
  initFinished: createAction('app/initFinished')(),
}

export type AppAction = ActionType<typeof AppActions>

export default AppActions
