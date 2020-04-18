import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import {
  Box,
  Container,
  IconButton,
  Typography,
  Paper,
} from '@material-ui/core'
import Rocket from 'components/icons/Rocket'

import Routes from 'routes'
import T from 'components/T'

const IdLayout: React.FC = () => (
  <Box
    minHeight="100vh"
    bgcolor="primary.main"
    display="flex"
    alignItems="center"
  >
    <Container maxWidth="xs">
      <Box
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <IconButton color="inherit">
          <Rocket />
        </IconButton>
        <Typography variant="h6">
          <T>missioncontrol</T>
        </Typography>
      </Box>
      <Paper>
        <Box p={4}>
          <Switch>
            <Route exact path={Routes.Login} component={Login} />
            <Route path="*">
              <Redirect to={Routes.Error404} />
            </Route>
          </Switch>
        </Box>
      </Paper>
    </Container>
  </Box>
)

export default IdLayout
