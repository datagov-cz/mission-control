import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {
  Box,
  Container,
  IconButton,
  Typography,
  Paper,
  AppBar,
} from '@material-ui/core'
import Rocket from 'components/icons/Rocket'
import { Namespace } from 'components/i18n'

import Routes from 'app/routes'
import t from 'components/i18n'
import BackdropGradient from 'components/ui/BackdropGradient'
import Login from './Login'
import Registration from './Registration'
import Navigation from './Navigation'

const IdLayout: React.FC = () => (
  <Namespace.Provider value="id">
    <BackdropGradient>
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
          <Typography variant="h6">{t`app.missioncontrol`}</Typography>
        </Box>
        <Paper>
          <AppBar position="static">
            <Navigation />
          </AppBar>
          <Box p={4}>
            <Switch>
              <Route exact path={Routes.Login} component={Login} />
              <Route
                exact
                path={Routes.Registration}
                component={Registration}
              />
              <Route path="*">
                <Redirect to={Routes.Error404} />
              </Route>
            </Switch>
          </Box>
        </Paper>
      </Container>
    </BackdropGradient>
  </Namespace.Provider>
)

export default IdLayout
