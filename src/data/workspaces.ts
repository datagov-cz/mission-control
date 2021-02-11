import { Subject, Observable } from 'rxjs'
import {
  map,
  switchMap,
  mapTo,
  startWith,
  share,
  filter,
  take,
} from 'rxjs/operators'
import { ObservableResource } from 'observable-hooks'

import {
  AddWorkspacePayload,
  WorkspaceData,
  Id,
  Workspace,
  EditWorkspacePayload,
  DeleteWorkspacePayload,
  PublishWorkspacePayload,
} from '@types'
import { DEFAULT_VOCABULARY_IRI } from 'app/variables'

import { del, getJSON, post, postJSON, putJSON } from 'utils/ajax'
import getIdFromResponse from 'utils/getIdFromResponse'
import { handleSuccess, handleError, throttleDistinct } from 'utils/epic'
import getIdFromIri from 'utils/getIdFromIri'

import {
  getWorkspacePublishUrl,
  getWorkspacesUrl,
  getWorkspaceUrl,
} from 'data/api'
import { convertUserDataToUser } from 'data/users'
import {
  addVocabulary,
  convertVocabularyDataToVocabulary,
} from 'data/vocabularies'

const convertWorkspaceDataToWorkspace = ({
  author,
  lastEditor,
  created,
  lastModified,
  vocabularyContexts,
  ...rest
}: WorkspaceData): Workspace => ({
  ...rest,
  id: getIdFromIri(rest.uri),
  author: convertUserDataToUser(author),
  lastEditor: lastEditor && convertUserDataToUser(lastEditor),
  created: new Date(created),
  lastModified: lastModified !== undefined ? new Date(lastModified) : undefined,
  vocabularies: vocabularyContexts.map(convertVocabularyDataToVocabulary),
})

const workspacesResource$$ = new Subject()

export const workspacesResource = new ObservableResource<Workspace[]>(
  workspacesResource$$.pipe(
    switchMap(() =>
      getJSON(getWorkspacesUrl()).pipe(
        map((data) => data as WorkspaceData[]),
        map((data) => data.map(convertWorkspaceDataToWorkspace))
      )
    )
  )
)

export const fetchWorkspaces = () => {
  workspacesResource$$.next()
}

const fetchWorkspace$$ = new Subject<Id>()
const workspaceResource$$ = fetchWorkspace$$.pipe(
  throttleDistinct(100),
  switchMap((workspaceId) =>
    getJSON(getWorkspaceUrl(workspaceId)).pipe(
      startWith(null),
      map((data) => data as WorkspaceData | null),
      map((data) => (data ? convertWorkspaceDataToWorkspace(data) : null))
    )
  ),
  share()
)

export const workspaceResource = new ObservableResource<Workspace>(
  workspaceResource$$ as Observable<Workspace>, // remove the null in typings as that is never emitted
  (value: Workspace | null): value is Workspace => !!value
)

export const fetchWorkspace = (workspaceId: Id) => {
  fetchWorkspace$$.next(workspaceId)
  return workspaceResource$$.pipe(
    filter((workspace) => workspace !== null),
    map((workspace) => workspace as Workspace),
    take(1)
  )
}

export const addWorkspace = (payload: AddWorkspacePayload) =>
  postJSON(getWorkspacesUrl(), payload).pipe(
    map(getIdFromResponse),
    handleSuccess('workspaces.addWorkspaceSuccess'),
    switchMap((workspaceId) =>
      addVocabulary({
        workspaceId,
        vocabularyIri: DEFAULT_VOCABULARY_IRI,
        readOnly: true,
        label: 'DEFAULT VOCABULARY',
      }).pipe(mapTo(workspaceId))
    ),
    handleError('workspaces.addWorkspaceError')
  )

export const editWorkspace = (payload: EditWorkspacePayload) =>
  putJSON(getWorkspaceUrl(getIdFromIri(payload.uri)), payload).pipe(
    handleSuccess('workspaces.editWorkspaceSuccess'),
    handleError('workspaces.editWorkspaceError')
  )

export const deleteWorkspace = (payload: DeleteWorkspacePayload) =>
  del(getWorkspaceUrl(getIdFromIri(payload.uri))).pipe(
    handleSuccess('workspaces.deleteWorkspaceSuccess'),
    handleError('workspaces.deleteWorkspaceError')
  )

export const publishWorkspace = (payload: PublishWorkspacePayload) =>
  post(getWorkspacePublishUrl(getIdFromIri(payload.uri))).pipe(
    map((response) => response.xhr.getResponseHeader('Location') || ''),
    handleSuccess('workspaces.publishWorkspaceSuccess'),
    handleError('workspaces.publishWorkspaceError')
  )
