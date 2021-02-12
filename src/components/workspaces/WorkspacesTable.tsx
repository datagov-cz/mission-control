import React, {
  MouseEvent,
  SuspenseConfig,
  unstable_useTransition as useTransition,
} from 'react'
import { useRouter } from 'react-router5'

import { Workspace } from '@types'
import Routes from 'app/routes'

import t from 'components/i18n'
import { DataColumn, DataTableSuspense } from 'components/DataTable'
import UserChip from 'components/users/UserChip'
import Tools from './Tools'
import formatDate from 'utils/formatDate'

import { workspacesResource, fetchWorkspace } from 'data/workspaces'

const WorkspacesTable: React.FC = () => {
  const router = useRouter()
  const [startTransition] = useTransition({
    timeoutMs: 10000,
  } as SuspenseConfig)

  const columns: DataColumn<Workspace>[] = [
    {
      title: t`label`,
      field: 'label',
    },
    {
      title: t`owner`,
      render: ({ author }) => <UserChip {...author} />,
    },
    {
      title: t`lastEditor`,
      render: ({ lastEditor }) => lastEditor && <UserChip {...lastEditor} />,
    },
    {
      title: t`lastModified`,
      render: ({ lastModified }) => lastModified && formatDate(lastModified),
    },
    {
      title: t`actions`,
      render: ({ uri }) => <Tools workspaceUri={uri} />,
    },
  ]

  const onRowClick = (
    _: MouseEvent | undefined,
    rowData: Workspace | undefined
  ) => {
    if (rowData) {
      startTransition(() => {
        fetchWorkspace(rowData.id)
        rowData && router.navigate(Routes.Workspace, { id: rowData.id })
      })
    }
  }

  return (
    <DataTableSuspense
      columns={columns}
      resource={workspacesResource}
      onRowClick={onRowClick}
    />
  )
}

export default WorkspacesTable
