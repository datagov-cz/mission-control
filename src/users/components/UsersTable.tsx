import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

import t from 'app/components/i18n'
import { useSelector } from 'react-redux'
import { getUsers, getUsersLoading } from 'users/selectors'
import { Skeleton } from '@material-ui/lab'

import { User } from 'users/types'
import { getIdentity } from 'id/selectors'
import useDispatchAction from 'app/hooks/useDispatchAction'
import Actions from 'app/actions'

const Header: React.FC = () => (
  <TableHead>
    <TableRow>
      <TableCell>{t`name`}</TableCell>
      <TableCell>{t`email`}</TableCell>
      <TableCell align="right">{t`actions`}</TableCell>
    </TableRow>
  </TableHead>
)

const UserAction: React.FC<{ user: User }> = ({ user }) => {
  const identity = useSelector(getIdentity)
  const handleDeactivate = useDispatchAction(
    Actions.Users.deactivateUser.request(user)
  )
  const handleActivate = useDispatchAction(
    Actions.Users.activateUser.request(user)
  )

  if (user.username === identity.username) {
    return null
  }
  if (user.isActive) {
    return (
      <Button
        onClick={handleDeactivate}
        color="secondary"
      >{t`deactivateUser`}</Button>
    )
  } else {
    return (
      <Button
        onClick={handleActivate}
        color="secondary"
      >{t`activateUser`}</Button>
    )
  }
}

const UserRow: React.FC<{ user: User }> = ({ user }) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={user.uri}>
    <TableCell>
      {user.firstName} {user.lastName}
    </TableCell>
    <TableCell>{user.username}</TableCell>
    <TableCell key="actions" align="right" padding="checkbox">
      <UserAction user={user} />
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
