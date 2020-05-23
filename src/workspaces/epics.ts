import { combineEpics } from 'redux-observable'
import { map, switchMap, mapTo } from 'rxjs/operators'

import { Epic } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { getJSON } from 'app/utils/ajax'
import { onRouteEnter, ofSafeType, mapError } from 'app/utils/epic'

import { getWorkspacesUrl } from './api'
import { WorkspaceData } from './types'

const getDataOnRouteEnter: Epic = ($action) =>
  onRouteEnter($action, Routes.Workspaces).pipe(
    mapTo(Actions.Workspaces.getWorkspaces.request())
  )

const getWorkspaces: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.getWorkspaces.request),
    switchMap(() =>
      getJSON(getWorkspacesUrl()).pipe(
        map((workspaces) => workspaces as WorkspaceData[]),
        map(Actions.Workspaces.getWorkspaces.success),
        mapError(Actions.Workspaces.getWorkspaces.failure)
      )
    )
  )

export default combineEpics(getDataOnRouteEnter, getWorkspaces)
