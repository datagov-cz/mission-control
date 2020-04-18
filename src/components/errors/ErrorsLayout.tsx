import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Box, IconButton, Typography } from '@material-ui/core'
import Rocket from 'components/icons/Rocket'

import Routes from 'routes'
import Error404 from './Error404'

const ErrorsLayout: React.FC = () => (
  <Box
    minHeight="100vh"
    bgcolor="primary.main"
    color="white"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Box p={2} display="flex" alignItems="center">
      <IconButton color="inherit">
        <Rocket />
      </IconButton>
      <Typography variant="h6">Mission Control</Typography>
    </Box>
    <Switch>
      <Route exact path={Routes.Error404} component={Error404} />
      <Route path="*">
        <Redirect to={Routes.Error404} />
      </Route>
    </Switch>
  </Box>
)

export default ErrorsLayout
