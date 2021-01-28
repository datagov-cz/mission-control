import React, { PropsWithChildren, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router5'

import router, { startRouter } from 'app/router'
import useThrow from 'hooks/useThrow'

type AuthProps = PropsWithChildren<{
  location?: Location
}>

const Auth: React.FC<AuthProps> = ({ children }) => {
  const throwError = useThrow()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      try {
        await startRouter()
        setInitialized(true)
      } catch (error) {
        throwError(error)
      }
    }
    initialize()
  }, [throwError, setInitialized])

  if (!initialized) {
    return null
  }

  return <RouterProvider router={router}>{children}</RouterProvider>
}

export default Auth
