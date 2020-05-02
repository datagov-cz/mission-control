import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuItem, Menu, Divider, Button } from '@material-ui/core'

import { getInitials, getUsername } from 'id/selectors'
import Actions from 'app/actions'
import Gravatar from './Gravatar'

const Identity: React.FC = () => {
  const initials = useSelector(getInitials)
  const email = useSelector(getUsername)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(Actions.Id.logout.request())
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button onClick={handleClick}>
        <Gravatar email={email} initials={initials} />
      </Button>
      <Menu
        id="id-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default Identity
