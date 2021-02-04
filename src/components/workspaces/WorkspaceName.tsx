import React from 'react'
import { useObservableSuspense } from 'observable-hooks'

import Title from 'components/Title'
import { workspaceResource } from 'data/workspaces'

const WorkspaceName: React.FC = () => {
  const workspace = useObservableSuspense(workspaceResource)
  return (
    <>
      <Title value={workspace.label} />
      {workspace.label}
    </>
  )
}

export default WorkspaceName
