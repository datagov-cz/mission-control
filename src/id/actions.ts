import { createAction, createAsyncAction, ActionType } from 'typesafe-actions'

import { LoginPayload, RegistrationPayload, Identity } from './types'

const IdActions = {
  init: createAction('id/init')(),
  initFinished: createAction('id/initFinished')(),
  login: createAsyncAction(
    'id/loginRequest',
    'id/loginSuccess',
    'id/loginFailure'
  )<LoginPayload, Identity, Error>(),
  getMyId: createAsyncAction(
    'id/getMyIdRequest',
    'id/getMyIdSuccess',
    'id/getMyIdFailure'
  )<void, Identity, Error>(),
  logout: createAsyncAction(
    'id/logoutRequest',
    'id/logoutSuccess',
    'id/logoutFailure'
  )<void, void, Error>(),
  register: createAsyncAction(
    'id/registerRequest',
    'id/registerSuccess',
    'id/registerFailure'
  )<RegistrationPayload, RegistrationPayload, Error>(),
}

export type IdAction = ActionType<typeof IdActions>

export default IdActions
