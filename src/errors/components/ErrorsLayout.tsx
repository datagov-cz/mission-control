import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Box, IconButton, Typography } from '@material-ui/core'

import Rocket from 'components/icons/Rocket'
import BackdropGradient from 'components/ui/BackdropGradient'
import t from 'components/i18n'
import Routes from 'app/routes'
import Error404 from './Error404'

const ErrorsLayout: React.FC = () => (
  <BackdropGradient color="white">
    <Box p={2} display="flex" alignItems="center">
      <IconButton color="inherit">
        <Rocket />
      </IconButton>
      <Typography variant="h6">{t`missioncontrol`}</Typography>
    </Box>
    <Switch>
      <Route exact path={Routes.Error404} component={Error404} />
      <Route path="*">
        <Redirect to={Routes.Error404} />
      </Route>
    </Switch>
  </BackdropGradient>
)

export default ErrorsLayout
