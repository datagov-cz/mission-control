import { createAction } from 'typesafe-actions'

const InitActions = {
  initApp: createAction('app/init')(),
  initAppFinished: createAction('app/initFinished')(),
}

export default InitActions
