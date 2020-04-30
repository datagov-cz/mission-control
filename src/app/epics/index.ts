import { combineEpics } from 'redux-observable'

import appEpics from './app'
import idEpics from 'id/epics'
import usersEpics from 'users/epics'
import workspacesEpics from 'workspaces/epics'

export default combineEpics(appEpics, idEpics, usersEpics, workspacesEpics)
