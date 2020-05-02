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
import { getUsers, getUsersLoading } from 'users/selectors'
import { Skeleton } from '@material-ui/lab'
import { User } from 'users/types'

const Header: React.FC = () => (
  <TableHead>
    <TableRow>
      <TableCell>{t`name`}</TableCell>
      <TableCell>{t`email`}</TableCell>
      <TableCell align="right">{t`actions`}</TableCell>
    </TableRow>
  </TableHead>
)

const UserRow: React.FC<{ user: User }> = ({ user }) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={user.uri}>
    <TableCell>
      {user.firstName} {user.lastName}
    </TableCell>
    <TableCell>{user.username}</TableCell>
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
  const users = useSelector(getUsers)
  const isLoading = useSelector(getUsersLoading)

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
        {users.map((user) => (
          <UserRow user={user} key={user.uri} />
        ))}
      </>
    )
  }
}

const UsersTable: React.FC = () => (
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

export default UsersTable
