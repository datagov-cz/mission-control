import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core'

import Icon from 'components/Icon'
import t from 'components/i18n'
import Help from 'components/Help'
import LanguageSelector from 'components/LanguageSelector'
import Identity from 'components/Identity'

const useStyles = makeStyles({
  root: {
    background: '#263238 linear-gradient(5deg, #057fa5 0%, #263238 100%)',
  },
})

const Header: React.FC = () => {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Box display="flex" flexGrow="1" flexBasis="20%" alignItems="center">
          <IconButton edge="start" color="inherit">
            <Icon />
          </IconButton>
          <Typography variant="h6">{t`controlPanel`}</Typography>
        </Box>
        <Box display="flex" flexGrow="1" flexBasis="auto"></Box>
        <Box
          display="flex"
          flexGrow="1"
          flexBasis="20%"
          justifyContent="flex-end"
        >
          <Help />
          <LanguageSelector />
          <Identity />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
