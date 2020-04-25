import { combineEpics } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { filter, mergeMap, map, first } from 'rxjs/operators'
import { of, merge } from 'rxjs'

import Actions from 'app/actions'
import { Epic, SnackbarContent } from 'app/types'

const init: Epic = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.App.init)),
    first(),
    mergeMap(() =>
      merge(
        $action.pipe(
          filter(isActionOf(Actions.Id.initFinished)),
          map(() => Actions.App.initFinished())
        ),
        of(Actions.Id.init())
      )
    )
  )

const snackbar: Epic = ($action) =>
  merge(
    $action.pipe(
      filter(isActionOf(Actions.App.error)),
      map(({ payload }) => ({ type: 'error', message: payload }))
    ),
    $action.pipe(
      filter(isActionOf(Actions.App.warning)),
      map(({ payload }) => ({ type: 'warning', message: payload }))
    ),
    $action.pipe(
      filter(isActionOf(Actions.App.info)),
      map(({ payload }) => ({ type: 'info', message: payload }))
    ),
    $action.pipe(
      filter(isActionOf(Actions.App.success)),
      map(({ payload }) => ({ type: 'success', message: payload }))
    )
  ).pipe(map((snackbar) => Actions.App.message(snackbar as SnackbarContent)))

export default combineEpics(init, snackbar)
