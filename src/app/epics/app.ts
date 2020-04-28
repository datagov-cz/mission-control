import { combineEpics } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { of, merge } from 'rxjs'
import { filter, mergeMap, map, first } from 'rxjs/operators'

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
      filter(isActionOf(Actions.Snackbar.error)),
      map(({ payload }) => ({ type: 'error', message: payload }))
    ),
    $action.pipe(
      filter(isActionOf(Actions.Snackbar.warning)),
      map(({ payload }) => ({ type: 'warning', message: payload }))
    ),
    $action.pipe(
      filter(isActionOf(Actions.Snackbar.info)),
      map(({ payload }) => ({ type: 'info', message: payload }))
    ),
    $action.pipe(
      filter(isActionOf(Actions.Snackbar.success)),
      map(({ payload }) => ({ type: 'success', message: payload }))
    )
  ).pipe(
    map((snackbar) => Actions.Snackbar.message(snackbar as SnackbarContent))
  )

export default combineEpics(init, snackbar)
