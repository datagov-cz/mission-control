import React from 'react'
import { useSelector } from 'react-redux'

import { getAppInitialized } from 'app/selectors'

const InitBoundary: React.FC = ({ children }) => {
  const appInitialized = useSelector(getAppInitialized)
  return appInitialized ? <>{children}</> : null
}

export default InitBoundary
