import { ObservableResource } from 'observable-hooks'
import { BehaviorSubject } from 'rxjs'

const suspendResource$$ = new BehaviorSubject<boolean>(false)
export const suspendResource = new ObservableResource(
  suspendResource$$,
  (suspended: boolean) => !suspended
)

export const suspend = () => suspendResource$$.next(true)

export const unSuspend = () => suspendResource$$.next(false)
