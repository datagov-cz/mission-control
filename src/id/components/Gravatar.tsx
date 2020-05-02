import React from 'react'
import { makeStyles, Avatar } from '@material-ui/core'
import md5 from 'crypto-js/md5'

const useStyles = makeStyles({
  avatar: {
    border: '2px solid #FFF',
    background: 'transparent',
  },
})

const getGravatarUrl = (email: string) =>
  `https://www.gravatar.com/avatar/${md5(email)}?d=404`

type GravatarProps = {
  email: string
  initials: string
}

const Gravatar: React.FC<GravatarProps> = ({ email, initials }) => {
  const classes = useStyles()
  const gravatarUrl = getGravatarUrl(email)

  return (
    <Avatar src={gravatarUrl} className={classes.avatar}>
      {initials}
    </Avatar>
  )
}

export default Gravatar
