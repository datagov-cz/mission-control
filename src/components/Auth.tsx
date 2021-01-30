import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Oidc, { UserManager, User } from 'oidc-client'

import { OIDC_CONFIG } from 'app/variables'
import useThrow from 'hooks/useThrow'

Oidc.Log.logger = console
const userManager = new UserManager(OIDC_CONFIG)

type AuthContextProps = {
  user: User
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextProps | null>(null)

const hasCodeInUrl = (location: Location): boolean => {
  const hashParams = new URLSearchParams(location.hash.replace('#', '?'))

  return (
    hashParams.has('code') ||
    hashParams.has('id_token') ||
    hashParams.has('session_state') ||
    hashParams.has('state')
  )
}

const stripCodeFromUrl = ({ protocol, host, pathname }: Location): string =>
  `${protocol}//${host}${pathname}`

type AuthProps = PropsWithChildren<{
  location?: Location
  history?: History
}>

const Auth: React.FC<AuthProps> = ({
  children,
  location = window.location,
  history = window.history,
}) => {
  const throwError = useThrow()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check if the user is returning back from OIDC
        if (hasCodeInUrl(location)) {
          await userManager.signinCallback()
          const user = await userManager.getUser()
          setUser(user)
          history.replaceState({}, '', stripCodeFromUrl(location))
          return
        }

        // Try to get user information
        const user = await userManager.getUser()
        if (!user) {
          // User not authenticated -> trigger auth flow
          await userManager.signinRedirect()
        } else {
          setUser(user)
        }
      } catch (error) {
        throwError(error)
      }
    }
    getUser()
  }, [location, history, throwError, setUser])

  useEffect(() => {
    // Refreshing react state when new state is available in e.g. session storage
    const updateUserData = async () => {
      try {
        const user = await userManager.getUser()
        setUser(user)
      } catch (error) {
        throwError(error)
      }
    }

    userManager.events.addUserLoaded(updateUserData)

    return () => userManager.events.removeUserLoaded(updateUserData)
  }, [throwError, setUser])

  const logout = useCallback(() => {
    const handleLogout = async () => {
      await userManager.signoutRedirect()
    }
    handleLogout()
  }, [])

  if (!user) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Auth
