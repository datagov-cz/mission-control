import React from 'react'
import { Typography, Container, Box } from '@material-ui/core'
import t, { Namespace } from 'app/components/i18n'
import UsersTable from './WorkspacesTable'

const Workspaces: React.FC = () => (
  <Namespace.Provider value="workspaces">
    <Container className="Workspaces">
      <Box height="30px"></Box>
      <Typography variant="h4" paragraph>{t`workspaces`}</Typography>
      <UsersTable />
    </Container>
  </Namespace.Provider>
)

export default Workspaces
