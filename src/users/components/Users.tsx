import React from 'react'
import { Typography, Container, Box } from '@material-ui/core'
import t from 'app/components/i18n'
import UsersTable from './UsersTable'

const Users: React.FC = () => (
  <Container className="Users">
    <Box height="30px"></Box>
    <Typography variant="h4" paragraph>{t`users`}</Typography>
    <UsersTable />
  </Container>
)

export default Users
