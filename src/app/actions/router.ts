import { ActionType } from 'typesafe-actions'
import { actions } from 'redux-router5'

const RouterActions = {
  navigateTo: actions.navigateTo,
  transitionSuccess: actions.transitionSuccess,
}

export type RouterAction = ActionType<typeof RouterActions>

export default RouterActions
