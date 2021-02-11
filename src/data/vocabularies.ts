import { Observable, Subject } from 'rxjs'
import {
  filter,
  map,
  mapTo,
  mergeMap,
  share,
  startWith,
  switchMap,
  take,
  throttleTime,
} from 'rxjs/operators'
import { ObservableResource } from 'observable-hooks'

import {
  AddVocabularyPayload,
  BaseVocabularyData,
  DeleteVocabularyPayload,
  Id,
  UpdateVocabularyPayload,
  Vocabulary,
  VocabularyData,
} from '@types'
import { VOCABULARY_CONTEXT_READ_ONLY } from 'app/variables'

import { del, getJSON, post } from 'utils/ajax'
import { handleError, handleSuccess, throttleDistinct } from 'utils/epic'
import getIdFromIri from 'utils/getIdFromIri'
import {
  getAddVocabularyUrl,
  getVocabulariesUrl,
  getVocabularyUrl,
  getWorkspaceVocabulariesUrl,
} from './api'

export const convertVocabularyDataToVocabulary = (
  data: VocabularyData
): Vocabulary => ({
  uri: data.uri,
  id: getIdFromIri(data.uri),
  label: data.label,
  vocabulary: data.basedOnVocabularyVersion,
  isReadOnly: !!data.types && data.types.includes(VOCABULARY_CONTEXT_READ_ONLY),
  vocabularyContext: data.uri,
  changeTrackingContext: data.changeTrackingContext.uri,
  changeTrackingVocabulary: data.changeTrackingContext.changesVocabularyVersion,
})

const fetchVocabularies$$ = new Subject()
const vocabulariesResource$$ = fetchVocabularies$$.pipe(
  throttleTime(100),
  switchMap(() =>
    getJSON(getVocabulariesUrl()).pipe(
      map((data) => data as BaseVocabularyData[])
    )
  ),
  share()
)

export const vocabulariesResource = new ObservableResource(
  vocabulariesResource$$
)

export const fetchVocabularies = () => {
  fetchVocabularies$$.next()
}

const fetchWorkspaceVocabularies$$ = new Subject<Id>()
const workspaceVocabulariesResource$$ = fetchWorkspaceVocabularies$$.pipe(
  throttleDistinct(100),
  switchMap((workspaceId) =>
    getJSON(getWorkspaceVocabulariesUrl(workspaceId)).pipe(
      startWith(null),
      map((data) => data as VocabularyData[] | null),
      map((data) => (data ? data.map(convertVocabularyDataToVocabulary) : null))
    )
  ),
  share()
)

export const workspaceVocabulariesResource = new ObservableResource<
  Vocabulary[]
>(
  workspaceVocabulariesResource$$ as Observable<Vocabulary[]>, // remove the null in typings as that is never emitted
  (value: Vocabulary[] | null): value is Vocabulary[] => !!value
)

export const fetchWorkspaceVocabularies = (workspaceId: Id) => {
  fetchWorkspaceVocabularies$$.next(workspaceId)
  return workspaceVocabulariesResource$$.pipe(
    filter((vocabularies) => vocabularies !== null),
    map((vocabularies) => vocabularies as Vocabulary[]),
    take(1)
  )
}

export const addVocabulary = (payload: AddVocabularyPayload) =>
  post(
    getAddVocabularyUrl(
      payload.workspaceId,
      payload.vocabularyIri,
      payload.readOnly,
      payload.label
    )
  ).pipe(
    handleSuccess('vocabularies.addVocabularySuccess'),
    mapTo(payload),
    handleError('vocabularies.addVocabularyError')
  )

export const deleteVocabulary = (payload: DeleteVocabularyPayload) =>
  del(getVocabularyUrl(payload.workspaceId, payload.vocabularyId)).pipe(
    handleSuccess('vocabularies.deleteVocabularySuccess'),
    handleError('vocabularies.deleteVocabularyError')
  )

export const updateVocabulary = (payload: UpdateVocabularyPayload) =>
  del(getVocabularyUrl(payload.workspace.id, payload.vocabulary.id)).pipe(
    mergeMap(() =>
      post(
        getAddVocabularyUrl(
          payload.workspace.id,
          payload.vocabulary.vocabulary,
          payload.vocabulary.isReadOnly,
          payload.vocabulary.label
        )
      ).pipe(
        handleSuccess('vocabularies.updateVocabularySuccess'),
        handleError('vocabularies.updateVocabularyError')
      )
    ),
    handleError('vocabularies.updateVocabularyError')
  )
