import initEpics from './init'
import { combineEpics } from 'redux-observable'

export default combineEpics(initEpics)
