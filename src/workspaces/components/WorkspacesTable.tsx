import React from 'react'

import t from 'app/components/i18n'
import { useSelector } from 'react-redux'
import { getWorkspaces, getWorkspacesLoading } from 'workspaces/selectors'
import { Workspace } from 'workspaces/types'
import DataTable, { DataColumn } from 'app/components/DataTable'
import { UserBadge } from 'users/components/UserBadge'

const WorkspacesTable: React.FC = () => {
  const workspaces = useSelector(getWorkspaces)
  const isLoading = useSelector(getWorkspacesLoading)

  const columns: DataColumn<Workspace>[] = [
    {
      title: t`label`,
      field: 'label',
    },
    {
      title: t`author`,
      field: 'label',
      cellStyle: {
        padding: '0 8px',
      },
      render: ({ author }) => <UserBadge {...author} />,
    },
  ]

  return <DataTable isLoading={isLoading} columns={columns} data={workspaces} />
}

export default WorkspacesTable
