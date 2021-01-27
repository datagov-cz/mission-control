import React from 'react'

import { useObservableSuspense } from 'observable-hooks'
import { workspaceResource } from 'data/workspaces'

const WorkspaceName: React.FC = () => {
  const workspace = useObservableSuspense(workspaceResource)
  return <>{workspace.label}</>
}

export default WorkspaceName
