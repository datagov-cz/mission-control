import { combineEpics } from 'redux-observable'

import appEpics from './app'
import idEpics from 'id/epics'

export default combineEpics(appEpics, idEpics)
