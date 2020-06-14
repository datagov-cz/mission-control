import React from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'

import Icon from 'app/components/Icon'
import BackdropGradient from 'app/components/BackdropGradient'
import t from 'app/components/i18n'

const Error401: React.FC = () => (
  <BackdropGradient color="white">
    <Box p={2} display="flex" alignItems="center">
      <IconButton color="inherit">
        <Icon />
      </IconButton>
      <Typography variant="h6">{t`controlPanel`}</Typography>
    </Box>
    <Typography variant="h1">401</Typography>
    <Typography variant="h3">{t`notAuthorized`}</Typography>
  </BackdropGradient>
)

export default Error401
