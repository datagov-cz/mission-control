import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  makeStyles,
  Avatar,
  MenuItem,
  Menu,
  Divider,
  Button,
} from '@material-ui/core'

import t from 'components/tx'

import { getInitials } from 'id/selectors'
import { Actions } from 'app/actions'

const useStyles = makeStyles({
  avatar: {
    border: '1px solid #FFF',
    background: 'transparent',
  },
})

const Identity: React.FC = () => {
  const initials = useSelector(getInitials)
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
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
        <Avatar className={classes.avatar}>{initials}</Avatar>
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
