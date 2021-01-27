import React from 'react'
import { useSelector } from 'react-redux'

import { getAppInitFinished } from 'app/selectors'

const InitBoundary: React.FC = ({ children }) => {
  const appInitFinished = useSelector(getAppInitFinished)
  return appInitFinished ? <>{children}</> : null
}

export default InitBoundary
