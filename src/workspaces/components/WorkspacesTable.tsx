import React, { MouseEvent } from 'react'

import t from 'app/components/i18n'
import { useSelector, useDispatch } from 'react-redux'
import { getWorkspaces, getWorkspacesLoading } from 'workspaces/selectors'
import { Workspace } from 'workspaces/types'
import DataTable, { DataColumn } from 'app/components/DataTable'
import UserChip from 'users/components/UserChip'
import Actions from 'app/actions'
import formatDate from 'app/utils/formatDate'
import Routes from 'app/routes'

const WorkspacesTable: React.FC = () => {
  const workspaces = useSelector(getWorkspaces)
  const isLoading = useSelector(getWorkspacesLoading)
  const dispatch = useDispatch()

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
  ]

  const onRowClick = (
    _: MouseEvent | undefined,
    rowData: Workspace | undefined
  ) =>
    rowData &&
    dispatch(
      Actions.Router.navigateTo({
        name: Routes.WorkspaceDetail,
        params: { id: rowData.id },
      })
    )

  return (
    <DataTable
      isLoading={isLoading}
      columns={columns}
      data={workspaces}
      onRowClick={onRowClick}
    />
  )
}

export default WorkspacesTable
