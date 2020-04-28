import React from 'react'
import {
  Box,
  Container,
  IconButton,
  Typography,
  Paper,
  AppBar,
} from '@material-ui/core'
import Rocket from 'app/components/icons/Rocket'
import { Namespace } from 'app/components/i18n'

import t from 'app/components/i18n'
import BackdropGradient from 'app/components/BackdropGradient'
import Navigation from './Navigation'
import RouteComponentRenderer from 'app/components/RouteComponentRenderer'

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
            <RouteComponentRenderer />
          </Box>
        </Paper>
      </Container>
    </BackdropGradient>
  </Namespace.Provider>
)

export default IdLayout
