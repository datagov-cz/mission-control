import { createAction, ActionType } from 'typesafe-actions'
import { actions, actionTypes } from 'redux-router5'
import { NavigationOptions } from 'router5'

/**
 * This is custom mapping to Router5 actions to enforce extra type safety
 */

type NavigateToActionPayload = {
  name: string
  params?: { [key: string]: any }
  opts?: NavigationOptions
}

type TransitionStartActionPayload = ReturnType<
  typeof actions.transitionStart
>['payload']

type TransitionSuccessActionPayload = ReturnType<
  typeof actions.transitionSuccess
>['payload']

const RouterActions = {
  navigateTo: createAction(actionTypes.NAVIGATE_TO)<NavigateToActionPayload>(),
  cancelTransition: createAction(actionTypes.CANCEL_TRANSITION)(),
  transitionStart: createAction(actionTypes.TRANSITION_START)<
    TransitionStartActionPayload
  >(),
  transitionSuccess: createAction(actionTypes.TRANSITION_SUCCESS)<
    TransitionSuccessActionPayload
  >(),
}

export type NavigateToAction = ReturnType<
  typeof RouterActions.navigateTo
>['payload']

export type CancelTransitionAction = ReturnType<
  typeof RouterActions.cancelTransition
>

export type TransitionSuccessAction = ReturnType<
  typeof RouterActions.transitionSuccess
>

export type RouterAction = ActionType<typeof RouterActions>

export default RouterActions
