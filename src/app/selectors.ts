import { State } from 'app/store'

export const getId = (state: State) => state.id

export const getAppInitialized = (state: State) => !state.init.loading
