import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'

import { Edit, Delete } from '@material-ui/icons'
import t from 'app/components/i18n'
import { useSelector } from 'react-redux'
import { getWorkspaces, getWorkspacesLoading } from 'workspaces/selectors'
import { Skeleton } from '@material-ui/lab'
import { Workspace } from 'workspaces/types'

const Header: React.FC = () => (
  <TableHead>
    <TableRow>
      <TableCell>{t`name`}</TableCell>
      <TableCell>{t`owner`}</TableCell>
      <TableCell align="right">{t`actions`}</TableCell>
    </TableRow>
  </TableHead>
)

const WorkspaceRow: React.FC<{ workspace: Workspace }> = ({ workspace }) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={workspace.uri}>
    <TableCell>{workspace.firstName}</TableCell>
    <TableCell>{workspace.name}</TableCell>
    <TableCell key="actions" align="right">
      <IconButton>
        <Edit />
      </IconButton>
      <IconButton>
        <Delete />
      </IconButton>
    </TableCell>
  </TableRow>
)

const DummyRow: React.FC = () => (
  <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell>
      <Skeleton />
    </TableCell>
    <TableCell>
      <Skeleton />
    </TableCell>
    <TableCell align="right">
      <Skeleton />
    </TableCell>
  </TableRow>
)

const Rows: React.FC = () => {
  const workspaces = useSelector(getWorkspaces)
  const isLoading = useSelector(getWorkspacesLoading)

  if (isLoading) {
    return (
      <>
        {Array.from(Array(10).keys()).map((index) => (
          <DummyRow key={index} />
        ))}
      </>
    )
  } else {
    return (
      <>
        {workspaces.map((workspace) => (
          <WorkspaceRow workspace={workspace} />
        ))}
      </>
    )
  }
}

const WorkspacesTable: React.FC = () => (
  <Paper>
    <TableContainer>
      <Table>
        <Header />
        <TableBody>
          <Rows />
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
)

export default WorkspacesTable
