import React from 'react'
import { Typography, Container, Box } from '@material-ui/core'

import t, { Namespace } from 'app/components/i18n'
import WorkspacesTable from './WorkspacesTable'
import AddWorkspace from './AddWorkspace'

const Workspaces: React.FC = () => (
  <Namespace.Provider value="workspaces">
    <Container className="Workspaces">
      <Box height="30px"></Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4" paragraph>{t`workspaces`}</Typography>
        <AddWorkspace />
      </Box>
      <WorkspacesTable />
    </Container>
  </Namespace.Provider>
)

export default Workspaces
