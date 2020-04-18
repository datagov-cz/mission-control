import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'

import Rocket from 'components/icons/Rocket'
import Navigation from './Navigation'
import T from 'components/T'

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit">
        <Rocket />
      </IconButton>
      <Typography variant="h6">
        <T>missioncontrol</T>
      </Typography>
      <Navigation />
    </Toolbar>
  </AppBar>
)

export default Header
