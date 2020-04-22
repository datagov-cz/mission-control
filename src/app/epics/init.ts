import { Epic, combineEpics } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { filter, mergeMap, map, first } from 'rxjs/operators'
import { of, merge } from 'rxjs'

import { Actions, Action } from 'app/actions'
import { State } from 'app/reducers'

const init: Epic<Action, Action, State> = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Init.initApp)),
    first(),
    mergeMap(() =>
      merge(
        $action.pipe(
          filter(isActionOf(Actions.Id.initFinished)),
          map(() => Actions.Init.initAppFinished())
        ),
        of(Actions.Id.init())
      )
    )
  )

export default combineEpics(init)
