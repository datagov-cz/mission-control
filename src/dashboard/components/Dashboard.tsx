import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import t, { Namespace } from 'app/components/i18n'

const Dashboard: React.FC = () => (
  <Namespace.Provider value="dashboard">
    <Container className="Dashboard">
      <Box height="30px"></Box>
      <Typography variant="h4" paragraph>{t`dashboard`}</Typography>
    </Container>
  </Namespace.Provider>
)

export default Dashboard
