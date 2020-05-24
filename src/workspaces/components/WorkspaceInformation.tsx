import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import t from 'app/components/i18n'
import formatDate from 'app/utils/formatDate'
import UserChip from 'users/components/UserChip'
import { getWorkspace, getWorkspacesLoading } from 'workspaces/selectors'
import KeyValueTable from 'app/components/KeyValueTable'

const WorkspaceInformation: React.FC = () => {
  const isLoading = useSelector(getWorkspacesLoading)
  const workspace = useSelector(getWorkspace)

  const isReady = !isLoading && workspace !== undefined

  const data = [
    {
      key: t`label`,
      value: isReady ? workspace!.label : <Skeleton />,
    },
    {
      key: t`owner`,
      value: isReady ? <UserChip {...workspace!.author} /> : <Skeleton />,
    },
    {
      key: t`lastEditor`,
      value: isReady ? (
        workspace?.lastEditor && <UserChip {...workspace.lastEditor} />
      ) : (
        <Skeleton />
      ),
    },
    {
      key: t`lastModified`,
      value: isReady ? (
        workspace!.lastModified && formatDate(workspace!.lastModified)
      ) : (
        <Skeleton />
      ),
    },
  ]

  return (
    <>
      <Typography variant="h5" paragraph>
        {t`workspaceInformation`}
      </Typography>
      <KeyValueTable data={data} />
    </>
  )
}

export default WorkspaceInformation
