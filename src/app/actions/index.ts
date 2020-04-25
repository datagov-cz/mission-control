import { ActionType } from 'typesafe-actions'

import AppActions from './app'
import IdActions from 'id/actions'
import { CallHistoryMethodAction } from 'connected-react-router'

const Actions = {
  App: AppActions,
  Id: IdActions,
}

export type Action = ActionType<typeof Actions> | CallHistoryMethodAction

export default Actions
