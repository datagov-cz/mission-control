import { combineEpics } from 'redux-observable'
import { merge } from 'rxjs'
import { map, switchMap, mapTo } from 'rxjs/operators'

import { Epic } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { getJSON, postJSON } from 'app/utils/ajax'
import { onRouteEnter, ofSafeType, mapError, fire } from 'app/utils/epic'

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

const addWorkspace: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.addWorkspace.request),
    switchMap(({ payload }) =>
      postJSON(getWorkspacesUrl(), payload).pipe(
        mapTo(Actions.Workspaces.addWorkspace.success()),
        mapError(Actions.Workspaces.addWorkspace.failure)
      )
    )
  )

const actionsAfterAddWorkspace: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Workspaces.addWorkspace.success),
      fire(
        Actions.Snackbar.success('workspaces.addWorkspaceSuccess'),
        Actions.Workspaces.openAddWorkspaceForm(false),
        Actions.Workspaces.getWorkspaces.request()
      )
    ),
    $action.pipe(
      ofSafeType(Actions.Workspaces.addWorkspace.failure),
      fire(Actions.Snackbar.error('workspaces.addWorkspaceError'))
    )
  )

export default combineEpics(
  getDataOnRouteEnter,
  getWorkspaces,
  addWorkspace,
  actionsAfterAddWorkspace
)
