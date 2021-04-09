import {
  MonoTypeOperatorFunction,
  Observable,
  ObservedValueOf,
  of,
  OperatorFunction,
  throwError,
} from "rxjs";
import { tap, catchError, map, scan, filter, finalize } from "rxjs/operators";
import { pipeFromArray } from "rxjs/internal/util/pipe";

import { MessageKey } from "@types";

import { showSuccess, showError } from "data/messages";
import { suspend, unSuspend } from "data/suspend";

export const handleSuccess = <T>(
  messageKey: MessageKey
): MonoTypeOperatorFunction<T> => tap((_) => showSuccess(messageKey));

export const handleError = <T>(
  messageKey?: MessageKey
): OperatorFunction<T, T | ObservedValueOf<Observable<never>>> =>
  catchError<T, Observable<never>>((error) => {
    if (messageKey) {
      showError(messageKey);
    }
    return throwError(error);
  });

export function throttleDistinct<T>(
  duration: number,
  equals: (a: T, b: T) => boolean = (a, b) => a === b
) {
  return (source: Observable<T>) => {
    return source.pipe(
      map((x) => {
        const obj = { val: x, time: Date.now(), keep: true };
        return obj;
      }),
      scan((acc, cur) => {
        const diff = cur.time - acc.time;

        const isSame = equals(acc.val, cur.val);
        return diff > duration || (diff < duration && !isSame)
          ? { ...cur, keep: true }
          : { ...acc, keep: false };
      }),
      filter((x) => x.keep),
      map((x) => x.val)
    );
  };
}

export function execute(): void;
export function execute<A>(op1: OperatorFunction<null, A>): void;
export function execute<A, B>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>
): void;
export function execute<A, B, C>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>
): void;
export function execute<A, B, C, D>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>
): void;
export function execute<A, B, C, D, E>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>
): void;
export function execute<A, B, C, D, E, F>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>
): void;
export function execute<A, B, C, D, E, F, G>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>
): void;
export function execute<A, B, C, D, E, F, G, H>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>
): void;
export function execute<A, B, C, D, E, F, G, H, I>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>,
  op9: OperatorFunction<H, I>
): void;
export function execute<A, B, C, D, E, F, G, H, I>(
  op1: OperatorFunction<null, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>,
  op9: OperatorFunction<H, I>,
  ...operations: OperatorFunction<any, any>[]
): void;

export function execute(...operations: OperatorFunction<any, any>[]): void {
  const pipeline = pipeFromArray([
    tap(suspend),
    ...operations,
    finalize(unSuspend),
  ]);
  pipeline(of(null)).subscribe();
}
