import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import t from 'components/i18n'

const Dashboard: React.FC = () => (
  <Container className="Dashboard">
    <Box height="30px"></Box>
    <Typography variant="h4" paragraph>{t`dashboard`}</Typography>
  </Container>
)

export default Dashboard
