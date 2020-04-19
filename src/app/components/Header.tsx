import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core'

import Rocket from 'components/icons/Rocket'
import Navigation from './Navigation'
import t from 'components/t'

const useStyles = makeStyles({
  root: {
    background: '#263238 linear-gradient(5deg, #880e4f 0%, #263238 100%)',
  },
})

const Header: React.FC = () => {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <Rocket />
        </IconButton>
        <Typography variant="h6">{t`missioncontrol`}</Typography>
        <Navigation />
      </Toolbar>
    </AppBar>
  )
}

export default Header
