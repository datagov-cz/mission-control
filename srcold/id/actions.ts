import { createAction, createAsyncAction, ActionType } from 'typesafe-actions'

import {
  LoginPayload,
  RegistrationPayload,
  Identity,
  UserNames,
  Passwords,
} from './types'

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
  editProfile: createAsyncAction(
    'id/editProfileRequest',
    'id/editProfileSuccess',
    'id/editProfileFailure'
  )<UserNames, void, Error>(),
  changePassword: createAsyncAction(
    'id/changePasswordRequest',
    'id/changePasswordSuccess',
    'id/changePasswordFailure'
  )<Passwords, void, Error>(),
}

export type IdAction = ActionType<typeof IdActions>

export default IdActions
