import { Observable } from 'rxjs'
import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax'
import { map } from 'rxjs/operators'

import { API_URL } from 'app/variables'
import { getToken } from './auth'

const COMMON_API_PREFIX = '/'

type Headers = Record<string, any>

const prefixWithApiUrl = (apiPathOrUrl: string) =>
  apiPathOrUrl.startsWith(COMMON_API_PREFIX)
    ? `${API_URL}${apiPathOrUrl}`
    : apiPathOrUrl

export const request = (request: AjaxRequest): Observable<AjaxResponse> => {
  const secureRequest = {
    ...request,
    url: prefixWithApiUrl(request.url || ''),
    headers: {
      Authorization: getToken(),
      ...(request.headers as Headers),
    },
  }

  return ajax(secureRequest)
}

export const get = (url: string, headers?: Headers) =>
  request({ method: 'GET', url, headers })

export const getJSON = <T extends unknown>(
  url: string,
  headers?: Headers
): Observable<T> =>
  request({ method: 'GET', url, headers }).pipe(
    map((response) => response.response)
  )

export const post = (url: string, body?: any, headers?: Headers) =>
  request({ method: 'POST', url, body, headers })

export const postJSON = (url: string, json: any, headers?: Headers) =>
  post(url, json, { 'Content-Type': 'application/json', ...headers })

export const put = (url: string, body?: any, headers?: Headers) =>
  request({ method: 'PUT', url, body, headers })

export const putJSON = (url: string, json: any, headers?: Headers) =>
  put(url, json, { 'Content-Type': 'application/json', ...headers })

export const del = (
  url: string,
  headers?: Headers,
  useSuspense: boolean = true
) => request({ method: 'DELETE', url, headers })
