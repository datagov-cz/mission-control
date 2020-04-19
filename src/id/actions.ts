import { createAsyncAction } from 'typesafe-actions'

const IdActions = {
  login: createAsyncAction(
    'app/id/login',
    'app/id/loginSuccess',
    'app/id/loginFailure'
  )(),
}

export default IdActions
