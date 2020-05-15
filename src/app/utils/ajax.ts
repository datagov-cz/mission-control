import { Observable } from 'rxjs'
import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax'
import { tap, map } from 'rxjs/operators'

import { API_URL } from 'app/config'
import { getToken, setToken } from './auth'

const COMMON_API_PREFIX = '/'

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
      ...request.headers,
    },
  }
  return ajax(secureRequest).pipe(
    tap((response) => {
      setToken(response.xhr.getResponseHeader('Authorization') || '')
    })
  )
}

export const get = (url: string, headers?: Object) =>
  request({ method: 'GET', url, headers })

export const getJSON = <T extends unknown>(
  url: string,
  headers?: Object
): Observable<T> =>
  request({ method: 'GET', url, headers }).pipe(
    map((response) => response.response)
  )

export const post = (url: string, body?: any, headers?: Object) =>
  request({ method: 'POST', url, body, headers })

export const postJSON = (url: string, json: any, headers?: Object) =>
  post(url, json, { 'Content-Type': 'application/json', ...headers })

export const put = (url: string, body?: any, headers?: Object) =>
  request({ method: 'PUT', url, body, headers })

export const putJSON = (url: string, json: any, headers?: Object) =>
  put(url, json, { 'Content-Type': 'application/json', ...headers })

export const del = (url: string, headers?: Object) =>
  request({ method: 'DELETE', url, headers })
