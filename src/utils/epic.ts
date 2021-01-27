import {
  MonoTypeOperatorFunction,
  Observable,
  ObservedValueOf,
  OperatorFunction,
  throwError,
} from 'rxjs'
import { tap, catchError, map, scan, filter } from 'rxjs/operators'

import { MessageKey } from '@types'

import { showSuccess, showError } from 'data/messages'

export const handleSuccess = <T>(
  messageKey: MessageKey
): MonoTypeOperatorFunction<T> => tap((_) => showSuccess(messageKey))

export const handleError = <T>(
  messageKey?: MessageKey
): OperatorFunction<T, T | ObservedValueOf<Observable<never>>> =>
  catchError<T, Observable<never>>((error) => {
    if (messageKey) {
      showError(messageKey)
    }
    return throwError(error)
  })

export function throttleDistinct<T>(
  duration: number,
  equals: (a: T, b: T) => boolean = (a, b) => a === b
) {
  return (source: Observable<T>) => {
    return source.pipe(
      map((x) => {
        const obj = { val: x, time: Date.now(), keep: true }
        return obj
      }),
      scan((acc, cur) => {
        const diff = cur.time - acc.time

        const isSame = equals(acc.val, cur.val)
        return diff > duration || (diff < duration && !isSame)
          ? { ...cur, keep: true }
          : { ...acc, keep: false }
      }),
      filter((x) => x.keep),
      map((x) => x.val)
    )
  }
}
