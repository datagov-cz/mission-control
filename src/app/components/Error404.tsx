import React from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'

import Rocket from 'app/components/icons/Rocket'
import BackdropGradient from 'app/components/BackdropGradient'
import t from 'app/components/i18n'

const Error404: React.FC = () => (
  <BackdropGradient color="white">
    <Box p={2} display="flex" alignItems="center">
      <IconButton color="inherit">
        <Rocket />
      </IconButton>
      <Typography variant="h6">{t`controlPanel`}</Typography>
    </Box>
    <Typography variant="h1">404</Typography>
    <Typography variant="h3">{t`pageNotFound`}</Typography>
  </BackdropGradient>
)

export default Error404
