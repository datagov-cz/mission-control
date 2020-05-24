import React from 'react'

import { useSelector } from 'react-redux'
import { getWorkspacesLoading, getWorkspace } from 'workspaces/selectors'
import { Skeleton } from '@material-ui/lab'

const WorkspaceName: React.FC = () => {
  const isLoading = useSelector(getWorkspacesLoading)
  const workspace = useSelector(getWorkspace)

  if (isLoading) {
    return <Skeleton width={400} />
  }
  return <>{workspace?.label}</>
}

export default WorkspaceName
