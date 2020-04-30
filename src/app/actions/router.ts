import { ActionType } from 'typesafe-actions'
import { actions } from 'redux-router5'

const RouterActions = {
  navigateTo: actions.navigateTo,
  transitionSuccess: actions.transitionSuccess,
}

export type NavigateToAction = ReturnType<typeof actions.navigateTo>

export type TransitionSuccessAction = ReturnType<
  typeof actions.transitionSuccess
>

export type RA = NavigateToAction | TransitionSuccessAction

export type RouterAction = ActionType<typeof RouterActions>

export default RouterActions
