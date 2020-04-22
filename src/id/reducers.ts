import { Reducer } from 'redux'
import { getType } from 'typesafe-actions'

import { Actions, Action } from 'app/actions'
import { Identity } from './types'

export interface IdState extends Identity {}

const initialState: IdState = {
  uri: '',
  types: [],
  username: '',
  firstName: '',
  lastName: '',
}

const idReducers: Reducer<IdState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case getType(Actions.Id.getMyId.success):
      return { ...action.payload }
    default:
      return state
  }
}

export default idReducers
