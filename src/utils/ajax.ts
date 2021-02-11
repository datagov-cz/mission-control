import { Observable, of } from 'rxjs'
import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax'
import { map, switchMap, tap } from 'rxjs/operators'

import { API_URL } from 'app/variables'
import { getToken } from './auth'
import { suspend, unSuspend } from 'data/suspend'

const COMMON_API_PREFIX = '/'

type Headers = Record<string, any>

const prefixWithApiUrl = (apiPathOrUrl: string) =>
  apiPathOrUrl.startsWith(COMMON_API_PREFIX)
    ? `${API_URL}${apiPathOrUrl}`
    : apiPathOrUrl

/**
 * Returns an observable of AjaxRequest, sets the suspend flag
 * to active during the request if specified
 */
export const request = (
  request: AjaxRequest,
  useSuspense: boolean = false
): Observable<AjaxResponse> => {
  const secureRequest = {
    ...request,
    url: prefixWithApiUrl(request.url || ''),
    headers: {
      Authorization: getToken(),
      ...(request.headers as Headers),
    },
  }

  return of(null).pipe(
    tap(() => {
      if (useSuspense) {
        suspend()
      }
    }),
    switchMap(() => ajax(secureRequest)),
    tap(() => {
      if (useSuspense) {
        unSuspend()
      }
    })
  )
}

export const get = (
  url: string,
  headers?: Headers,
  useSuspense: boolean = false
) => request({ method: 'GET', url, headers }, useSuspense)

export const getJSON = <T extends unknown>(
  url: string,
  headers?: Headers,
  useSuspense: boolean = false
): Observable<T> =>
  request({ method: 'GET', url, headers }, useSuspense).pipe(
    map((response) => response.response)
  )

export const post = (
  url: string,
  body?: any,
  headers?: Headers,
  useSuspense: boolean = true
) => request({ method: 'POST', url, body, headers }, useSuspense)

export const postJSON = (
  url: string,
  json: any,
  headers?: Headers,
  useSuspense: boolean = true
) =>
  post(
    url,
    json,
    { 'Content-Type': 'application/json', ...headers },
    useSuspense
  )

export const put = (
  url: string,
  body?: any,
  headers?: Headers,
  useSuspense: boolean = true
) => request({ method: 'PUT', url, body, headers }, useSuspense)

export const putJSON = (
  url: string,
  json: any,
  headers?: Headers,
  useSuspense: boolean = true
) =>
  put(
    url,
    json,
    { 'Content-Type': 'application/json', ...headers },
    useSuspense
  )

export const del = (
  url: string,
  headers?: Headers,
  useSuspense: boolean = true
) => request({ method: 'DELETE', url, headers }, useSuspense)
