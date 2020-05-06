import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  MenuItem,
  Menu,
  Divider,
  Button,
  Typography,
  ListItemIcon,
} from '@material-ui/core'
import { Face, ExitToApp } from '@material-ui/icons'

import { getInitials, getUsername } from 'id/selectors'
import Actions from 'app/actions'
import Gravatar from './Gravatar'
import t, { Namespace } from 'app/components/i18n'
import Routes from 'app/routes'

const Identity: React.FC = () => {
  const initials = useSelector(getInitials)
  const email = useSelector(getUsername)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(Actions.Id.logout.request())
  }

  const handleProfile = () => {
    dispatch(Actions.Router.navigateTo(Routes.MeProfile))
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Namespace.Provider value="id">
      <Button onClick={handleClick}>
        <Gravatar email={email} initials={initials} />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <Face />
          </ListItemIcon>
          <Typography variant="inherit">{t`profile`}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <Typography variant="inherit">{t`logout`}</Typography>
        </MenuItem>
      </Menu>
    </Namespace.Provider>
  )
}

export default Identity
