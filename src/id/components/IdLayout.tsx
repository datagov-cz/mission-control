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

import Routes from 'app/routes'
import t from 'components/t'
import BackdropGradient from 'components/ui/BackdropGradient'

const IdLayout: React.FC = () => (
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
        <Typography variant="h6">{t`missioncontrol`}</Typography>
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
  </BackdropGradient>
)

export default IdLayout
