import React from 'react'
import {
  Box,
  Container,
  IconButton,
  Typography,
  Paper,
  AppBar,
} from '@material-ui/core'

import t, { Namespace } from 'app/components/i18n'
import Icon from 'app/components/Icon'
import BackdropGradient from 'app/components/BackdropGradient'
import Navigation from './Navigation'
import RouteComponentRenderer from 'app/components/RouteComponentRenderer'
import LanguageSelector from 'app/components/LanguageSelector'

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
            <Icon />
          </IconButton>
          <Typography variant="h6">{t`app.controlPanel`}</Typography>
        </Box>
        <Paper>
          <AppBar position="static">
            <Navigation />
          </AppBar>
          <Box p={4}>
            <RouteComponentRenderer />
          </Box>
        </Paper>
        <Box p={2} display="flex" justifyContent="center" color="white">
          <LanguageSelector />
        </Box>
      </Container>
    </BackdropGradient>
  </Namespace.Provider>
)

export default IdLayout
