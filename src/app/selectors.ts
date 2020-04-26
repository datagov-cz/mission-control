import { createSelector } from 'reselect'
import { State } from 'app/types'

export const getId = (state: State) => state.id

export const getApp = (state: State) => state.app

export const getAppInitialized = createSelector(
  getApp,
  (state) => !state.loading
)

export const getSnackbar = createSelector(getApp, (state) => state.snackbar)
