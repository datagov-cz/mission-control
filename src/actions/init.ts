import { createAction } from 'typesafe-actions'

export const InitActions = {
  initApp: createAction('app/init')(),
  initAppFinished: createAction('app/initFinished')(),
}
