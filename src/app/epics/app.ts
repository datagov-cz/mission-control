import { combineEpics } from 'redux-observable'
import { of, merge } from 'rxjs'
import {
  switchMap,
  map,
  mapTo,
  first,
  tap,
  ignoreElements,
} from 'rxjs/operators'

import Actions from 'app/actions'
import { Epic, SnackbarContent } from 'app/types'
import { startRouter } from 'app/router'
import { ofSafeType } from 'app/utils/epic'
import { setLocale } from 'app/utils/i18n'

const init: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.App.init),
    first(),
    switchMap(() => startRouter()),
    switchMap(() =>
      merge(
        of(Actions.Id.init()),
        $action.pipe(
          ofSafeType(Actions.Id.initFinished),
          mapTo(Actions.App.initFinished())
        )
      )
    )
  )

const snackbar: Epic = ($action) =>
  merge(
    $action.pipe(
      ofSafeType(Actions.Snackbar.error),
      map(({ payload }) => ({ type: 'error', message: payload }))
    ),
    $action.pipe(
      ofSafeType(Actions.Snackbar.warning),
      map(({ payload }) => ({ type: 'warning', message: payload }))
    ),
    $action.pipe(
      ofSafeType(Actions.Snackbar.info),
      map(({ payload }) => ({ type: 'info', message: payload }))
    ),
    $action.pipe(
      ofSafeType(Actions.Snackbar.success),
      map(({ payload }) => ({ type: 'success', message: payload }))
    )
  ).pipe(
    map((snackbar) => Actions.Snackbar.message(snackbar as SnackbarContent))
  )

const locale: Epic = ($action) =>
  $action.pipe(
    ofSafeType(Actions.App.setLocale),
    tap(({ payload }) => setLocale(payload)),
    ignoreElements()
  )

export default combineEpics(init, snackbar, locale)
