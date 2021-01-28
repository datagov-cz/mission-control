import React, { useCallback, useState } from 'react'
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
import useAuth from 'hooks/useAuth'

const Identity: React.FC = () => {
  // TODO: remove / refactor
  // const { profile } = useObservableEagerState(identity$$)!

  const { identity, userManager } = useAuth()

  const initials = `${identity?.profile.given_name?.charAt(
    0
  )}${identity?.profile.family_name?.charAt(0)}`

  const [anchorEl, setAnchorEl] = useState(null)

  // TODO: rethink :-)
  const handleLogout = useCallback(() => {
    userManager
      .removeUser()
      .then(() => (window.location.href = 'https://data.gov.cz'))
  }, [userManager])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Namespace.Provider value="common">
      <Button onClick={handleClick}>
        <Gravatar email={identity?.profile.email!} initials={initials} />
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
