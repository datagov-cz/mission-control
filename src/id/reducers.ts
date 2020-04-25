import { getType } from 'typesafe-actions'

import Actions from 'app/actions'
import { Reducer } from 'app/types'
import { Identity } from './types'

export interface IdState extends Identity {}

const initialState: IdState = {
  uri: '',
  types: [],
  username: '',
  firstName: '',
  lastName: '',
}

const idReducers: Reducer<IdState> = (state = initialState, action) => {
  switch (action.type) {
    case getType(Actions.Id.getMyId.success):
      return { ...action.payload }
    default:
      return state
  }
}

export default idReducers
