import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'

import Rocket from 'components/icons/Rocket'
import Navigation from './Navigation'

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit">
        <Rocket />
      </IconButton>
      <Typography variant="h6">Mission Control</Typography>
      <Navigation />
    </Toolbar>
  </AppBar>
)

export default Header
