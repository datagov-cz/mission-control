import { Epic, combineEpics } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { filter, mergeMap, tap } from 'rxjs/operators'
import { empty } from 'rxjs'

import { Actions, Action } from 'actions'
import { State } from 'reducers'

const init: Epic<Action, Action, State> = ($action) =>
  $action.pipe(
    filter(isActionOf(Actions.Init.initApp)),
    tap(() => console.log('whoa')),
    mergeMap(() => empty())
  )

export default combineEpics(init)
