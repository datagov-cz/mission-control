import React, { useState } from 'react'
import {
  MenuItem,
  Menu,
  Button,
  Typography,
  ListItemIcon,
} from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'

import Gravatar from 'components/users/Gravatar'
import t, { Namespace } from 'components/i18n'

const Identity: React.FC = () => {
  /* TODO:
  const initials = useSelector(getInitials)
  const email = useSelector(getUsername)
  */
  const initials = 'KK'
  const email = 'karelklima@gmail.com'
  const [anchorEl, setAnchorEl] = useState(null)

  const handleLogout = () => {
    //TODO: dispatch(Actions.Id.logout.request())
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
