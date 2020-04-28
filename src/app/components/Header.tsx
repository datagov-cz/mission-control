import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core'

import Rocket from 'app/components/icons/Rocket'
import Navigation from './Navigation'
import t from 'app/components/i18n'
import Identity from 'id/components/Identity'

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
        <Box display="flex" flexGrow="1" flexBasis="20%" alignItems="center">
          <IconButton edge="start" color="inherit">
            <Rocket />
          </IconButton>
          <Typography variant="h6">{t`missioncontrol`}</Typography>
        </Box>
        <Navigation />
        <Box
          display="flex"
          flexGrow="1"
          flexBasis="20%"
          justifyContent="flex-end"
        >
          <Identity />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
