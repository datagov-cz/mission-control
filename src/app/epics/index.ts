import { combineEpics } from 'redux-observable'

import initEpics from './init'
import idEpics from 'id/epics'

export default combineEpics(initEpics, idEpics)
