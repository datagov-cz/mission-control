import { createSelector } from 'reselect'
import { State } from 'app/types'

export const getId = (state: State) => state.id

export const getApp = (state: State) => state.app

export const getSnackbar = (state: State) => state.snackbar

export const getAppInitFinished = createSelector(
  getApp,
  (state) => state.initFinished
)
