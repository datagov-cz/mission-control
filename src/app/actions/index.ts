import {
  ActionType,
  ActionCreator as BaseActionCreator,
  TypeConstant,
} from 'typesafe-actions'

import InitActions from './init'
import IdActions from 'id/actions'
import { CallHistoryMethodAction } from 'connected-react-router'

export const Actions = {
  Init: InitActions,
  Id: IdActions,
}

type ActionCreatorType<
  TActionCreatorOrMap extends any
> = TActionCreatorOrMap extends BaseActionCreator<TypeConstant>
  ? TActionCreatorOrMap
  : TActionCreatorOrMap extends Record<any, any>
  ? {
      [K in keyof TActionCreatorOrMap]: ActionCreatorType<
        TActionCreatorOrMap[K]
      >
    }[keyof TActionCreatorOrMap]
  : TActionCreatorOrMap extends infer R
  ? never
  : never

export type ActionCreator = ActionCreatorType<typeof Actions>

export type Action = ActionType<typeof Actions> | CallHistoryMethodAction
