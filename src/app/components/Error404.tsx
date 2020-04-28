import React from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'

import Rocket from 'app/components/icons/Rocket'
import BackdropGradient from 'app/components/BackdropGradient'
import t from 'app/components/i18n'
import useRoute from 'app/hooks/useRoute'
import { constants } from 'router5'

const Error404: React.FC = () => {
  const { route } = useRoute()
  const is404 = route.name === constants.UNKNOWN_ROUTE
  if (!is404) {
    return null
  }
  return (
    <BackdropGradient color="white">
      <Box p={2} display="flex" alignItems="center">
        <IconButton color="inherit">
          <Rocket />
        </IconButton>
        <Typography variant="h6">{t`missioncontrol`}</Typography>
      </Box>
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">{t`pageNotFound`}</Typography>
    </BackdropGradient>
  )
}

export default Error404
