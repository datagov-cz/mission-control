import React from 'react'
import { Chip, makeStyles, Theme } from '@material-ui/core'

import { User } from '@types'

import Gravatar from 'components/users/Gravatar'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: 'transparent',
    margin: theme.spacing(-0.75, -0.75),
  },
}))

type UserChipProps = User

const UserChip: React.FC<UserChipProps> = ({
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

export default UserChip
