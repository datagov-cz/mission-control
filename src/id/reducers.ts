import { getType } from 'typesafe-actions'

import Actions from 'app/actions'
import { Reducer } from 'app/types'
import { Identity, IdAction } from './types'

export interface IdState extends Identity {}

const initialState: IdState = {
  uri: '',
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
      const { uri, types, username, firstName, lastName } = action.payload
      return { uri, types, username, firstName, lastName }
    default:
      return state
  }
}

export default idReducers
