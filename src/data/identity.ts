import { identity } from 'lodash'
import { ObservableResource } from 'observable-hooks'
import { User as Identity } from 'oidc-client'
import { BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'
import { setToken, removeToken } from 'utils/auth'

export const identity$$ = new BehaviorSubject<Identity | null>(null)

identity$$
  .pipe(
    tap((user) => {
      if (user) {
        setToken(user.id_token)
      } else {
        removeToken()
      }
    })
  )
  .subscribe()

export const setIdentity = (identity: Identity | null) =>
  identity$$.next(identity)

export const removeIdentity = () => setIdentity(null)
