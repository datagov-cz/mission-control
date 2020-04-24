import React from 'react'
import { Typography, Container, Box } from '@material-ui/core'
import t from 'components/i18n'
import UsersDummyTable from './UsersDummyTable'

const Users: React.FC = () => (
  <Container className="Users">
    <Box height="30px"></Box>
    <Typography variant="h4" paragraph>{t`users`}</Typography>
    <UsersDummyTable />
  </Container>
)

export default Users
