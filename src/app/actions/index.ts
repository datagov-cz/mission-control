import { ActionType } from 'typesafe-actions'

import InitActions from './init'
import IdActions from 'id/actions'

export const Actions = {
  Init: InitActions,
  Id: IdActions,
}

export type Action = ActionType<typeof Actions>
