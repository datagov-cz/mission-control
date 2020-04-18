import { ActionType } from 'typesafe-actions'

import { InitActions } from './init'

export const Actions = {
  Init: InitActions,
}

export type Action = ActionType<typeof Actions>
