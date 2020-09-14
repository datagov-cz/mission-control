import { combineEpics } from 'redux-observable'
import { merge, of } from 'rxjs'
import { map, switchMap, mapTo } from 'rxjs/operators'

import { Epic, Id } from 'app/types'
import Actions from 'app/actions'
import Routes from 'app/routes'
import { getJSON, postJSON, putJSON, del, post } from 'app/utils/ajax'
import { onRouteEnter, ofSafeType, mapError, fire } from 'app/utils/epic'

import {
  getWorkspacesUrl,
  getWorkspaceUrl,
  getWorkspacePublishUrl,
  getAddVocabularyUrl,
  getVocabularyUrl,
  getVocabulariesUrl,
} from './api'
import { WorkspaceData, BaseVocabularyData } from './types'
import getIdFromUri from 'app/utils/getIdFromUri'

const getDataOnRouteEnter: Epic = ($action) =>
  merge(
    onRouteEnter($action, Routes.WorkspacesList).pipe(
      mapTo(Actions.Workspaces.getWorkspaces.request())
    ),
    onRouteEnter($action, Routes.WorkspaceDetail).pipe(
      mapTo(Actions.Workspaces.getVocabularies.request())
    ),
    onRouteEnter($action, Routes.WorkspaceDetail).pipe(
      map(({ route }) =>
        Actions.Workspaces.getWorkspace.request(route.params.id)
      )
    )
  )

const getVocabularies: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.getVocabularies.request),
    switchMap(() =>
      getJSON(getVocabulariesUrl()).pipe(
        map((vocabularies) => vocabularies as BaseVocabularyData[]),
        map(Actions.Workspaces.getVocabularies.success),
        mapError(Actions.Workspaces.getVocabularies.failure)
      )
    )
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

const getWorkspace: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.getWorkspace.request),
    switchMap(({ payload }) =>
      getJSON(getWorkspaceUrl(payload as Id)).pipe(
        map((workspace) => workspace as WorkspaceData),
        map(Actions.Workspaces.getWorkspace.success),
        mapError(Actions.Workspaces.getWorkspace.failure)
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

const editWorkspace: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.editWorkspace.request),
    switchMap(({ payload }) =>
      putJSON(getWorkspaceUrl(getIdFromUri(payload.uri)), payload).pipe(
        mapTo(Actions.Workspaces.editWorkspace.success(payload)),
        mapError(Actions.Workspaces.editWorkspace.failure)
      )
    )
  )

const actionsAfterEditWorkspace: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Workspaces.editWorkspace.success),
      switchMap(({ payload }) =>
        of(
          Actions.Snackbar.success('workspaces.editWorkspaceSuccess'),
          Actions.Workspaces.openEditWorkspaceForm(false),
          Actions.Workspaces.getWorkspace.request(getIdFromUri(payload.uri))
        )
      )
    ),
    $action.pipe(
      ofSafeType(Actions.Workspaces.editWorkspace.failure),
      fire(Actions.Snackbar.error('workspaces.editWorkspaceError'))
    )
  )

const deleteWorkspace: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.deleteWorkspace.request),
    switchMap(({ payload }) =>
      del(getWorkspaceUrl(getIdFromUri(payload.uri))).pipe(
        mapTo(Actions.Workspaces.deleteWorkspace.success(payload)),
        mapError(Actions.Workspaces.deleteWorkspace.failure)
      )
    )
  )

const actionsAfterDeleteWorkspace: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Workspaces.deleteWorkspace.success),
      switchMap(({ payload }) =>
        of(
          Actions.Snackbar.success('workspaces.deleteWorkspaceSuccess'),
          Actions.Workspaces.openDeleteWorkspaceForm(false),
          Actions.Router.navigateTo({ name: Routes.Workspaces })
        )
      )
    ),
    $action.pipe(
      ofSafeType(Actions.Workspaces.deleteWorkspace.failure),
      fire(Actions.Snackbar.error('workspaces.deleteWorkspaceError'))
    )
  )

const publishWorkspace: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.publishWorkspace.request),
    switchMap(({ payload }) =>
      post(getWorkspacePublishUrl(getIdFromUri(payload.uri))).pipe(
        map((response) =>
          Actions.Workspaces.publishWorkspace.success(
            response.xhr.getResponseHeader('Location') || ''
          )
        ),
        mapError(Actions.Workspaces.publishWorkspace.failure)
      )
    )
  )

const actionsAfterPublishWorkspace: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Workspaces.publishWorkspace.success),
      fire(Actions.Snackbar.success('workspaces.publishWorkspaceSuccess'))
    ),
    $action.pipe(
      ofSafeType(Actions.Workspaces.publishWorkspace.failure),
      fire(Actions.Snackbar.error('workspaces.publishWorkspaceError'))
    )
  )

const addVocabulary: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.addVocabulary.request),
    switchMap(({ payload }) =>
      post(
        getAddVocabularyUrl(
          getIdFromUri(payload.workspaceUri),
          payload.vocabularyUri,
          payload.readOnly,
          payload.label
        )
      ).pipe(
        mapTo(Actions.Workspaces.addVocabulary.success(payload)),
        mapError(Actions.Workspaces.addVocabulary.failure)
      )
    )
  )

const actionsAfterAddVocabulary: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Workspaces.addVocabulary.success),
      switchMap(({ payload }) =>
        of(
          Actions.Snackbar.success('workspaces.addVocabularySuccess'),
          Actions.Workspaces.openAddVocabularyForm(false),
          Actions.Workspaces.getWorkspace.request(
            getIdFromUri(payload.workspaceUri)
          )
        )
      )
    ),
    $action.pipe(
      ofSafeType(Actions.Workspaces.addVocabulary.failure),
      fire(Actions.Snackbar.error('workspaces.addVocabularyError'))
    )
  )

const deleteVocabulary: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.deleteVocabulary.request),
    switchMap(({ payload }) =>
      del(getVocabularyUrl(payload.workspaceId, payload.vocabularyId)).pipe(
        mapTo(Actions.Workspaces.deleteVocabulary.success(payload)),
        mapError(Actions.Workspaces.deleteVocabulary.failure)
      )
    )
  )

const actionsAfterDeleteVocabulary: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Workspaces.deleteVocabulary.success),
      switchMap(({ payload }) =>
        of(
          Actions.Snackbar.success('workspaces.deleteVocabularySuccess'),
          Actions.Workspaces.openDeleteVocabularyForm(false),
          Actions.Workspaces.getWorkspace.request(payload.workspaceId)
        )
      )
    ),
    $action.pipe(
      ofSafeType(Actions.Workspaces.deleteVocabulary.failure),
      fire(Actions.Snackbar.error('workspaces.deleteVocabularyError'))
    )
  )

const updateVocabulary: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.Workspaces.updateVocabulary.request),
    switchMap(({ payload }) =>
      del(getVocabularyUrl(payload.workspace!.id, payload.vocabulary.id)).pipe(
        switchMap(() =>
          post(
            getAddVocabularyUrl(
              payload.workspace!.id,
              payload.vocabulary.vocabulary,
              payload.vocabulary.isReadOnly,
              payload.vocabulary.label
            )
          ).pipe(
            mapTo(Actions.Workspaces.updateVocabulary.success(payload)),
            mapError(Actions.Workspaces.updateVocabulary.failure)
          )
        ),
        mapError(Actions.Workspaces.updateVocabulary.failure)
      )
    )
  )

const actionsAfterUpdateVocabulary: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Workspaces.updateVocabulary.success),
      switchMap(({ payload }) =>
        of(
          Actions.Snackbar.success('workspaces.updateVocabularySuccess'),
          Actions.Workspaces.getWorkspace.request(payload.workspace!.id)
        )
      )
    ),
    $action.pipe(
      ofSafeType(Actions.Workspaces.updateVocabulary.failure),
      fire(Actions.Snackbar.error('workspaces.updateVocabularyError'))
    )
  )

export default combineEpics(
  getDataOnRouteEnter,
  getVocabularies,
  getWorkspaces,
  getWorkspace,
  addWorkspace,
  actionsAfterAddWorkspace,
  editWorkspace,
  actionsAfterEditWorkspace,
  deleteWorkspace,
  actionsAfterDeleteWorkspace,
  publishWorkspace,
  actionsAfterPublishWorkspace,
  addVocabulary,
  actionsAfterAddVocabulary,
  deleteVocabulary,
  actionsAfterDeleteVocabulary,
  updateVocabulary,
  actionsAfterUpdateVocabulary
)
