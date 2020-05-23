import React from 'react'
import Gravatar from 'app/components/Gravatar'
import { User } from 'users/types'
import { Chip, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: 'transparent',
  },
}))

export const UserBadge: React.FC<User> = ({
  username,
  initials,
  firstName,
  lastName,
}) => {
  const classes = useStyles()
  return (
    <Chip
      label={`${firstName} ${lastName}`}
      avatar={<Gravatar email={username} initials={initials} />}
      classes={classes}
    />
  )
}
