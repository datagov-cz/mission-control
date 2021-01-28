import React, { PropsWithChildren, useEffect } from 'react'
import { useObservableEagerState } from 'observable-hooks'
import { UserManager } from 'oidc-client'

import { OIDC_CONFIG } from 'app/variables'
import useThrow from 'hooks/useThrow'
import { identity$$, setIdentity } from 'data/identity'

const userManager = new UserManager(OIDC_CONFIG)

const hasCodeInUrl = (location: Location): boolean => {
  const searchParams = new URLSearchParams(location.search)
  const hashParams = new URLSearchParams(location.hash.replace('#', '?'))

  return (
    searchParams.has('code') ||
    searchParams.has('id_token') ||
    searchParams.has('session_state') ||
    hashParams.has('code') ||
    hashParams.has('id_token') ||
    hashParams.has('session_state')
  )
}

const stripCodeFromUrl = ({ protocol, host, pathname }: Location): string =>
  `${protocol}//${host}${pathname}`

type AuthProps = PropsWithChildren<{
  location?: Location
}>

const Auth: React.FC<AuthProps> = ({
  children,
  location = window.location,
}) => {
  const throwError = useThrow()

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check if the user is returning back from OIDC
        if (hasCodeInUrl(location)) {
          await userManager.signinCallback()
          const user = await userManager.getUser()
          setIdentity(user)
          location.replace(stripCodeFromUrl(location))
          return
        }

        // Try to get user information
        const user = await userManager.getUser()
        if (!user) {
          // User not authenticated -> trigger auth flow
          await userManager.signinRedirect()
        } else {
          setIdentity(user)
        }
      } catch (error) {
        throwError(error)
      }
    }
    getUser()
  }, [location, throwError])

  useEffect(() => {
    // Refreshing react state when new state is available in e.g. session storage
    const updateUserData = async () => {
      try {
        const user = await userManager.getUser()
        setIdentity(user)
      } catch (error) {
        throwError(error)
      }
    }

    userManager.events.addUserLoaded(updateUserData)

    return () => userManager.events.removeUserLoaded(updateUserData)
  }, [throwError])

  const identity = useObservableEagerState(identity$$)

  console.warn(identity)

  if (!identity) {
    return null
  }

  return <>{children}</>
}

export default Auth
