import { getType } from 'typesafe-actions'

import Actions from 'app/actions'
import { Reducer } from 'app/types'
import { Identity, IdAction } from './types'

export type IdState = Identity

const initialState: IdState = {
  uri: '',
  admin: false,
  types: [],
  username: '',
  firstName: '',
  lastName: '',
}

const idReducers: Reducer<IdState, IdAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(Actions.Id.getMyId.success):
      return { ...action.payload }
    default:
      return state
  }
}

export default idReducers
