import React from 'react'
import { Box, IconButton, styled, Typography } from '@material-ui/core'

import Icon from 'components/Icon'
import t from 'components/i18n'

const BackdropGradient = styled(Box)({
  background: '#263238 radial-gradient(circle, #057fa5 0%, #263238 100%)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const Error404: React.FC = () => (
  <BackdropGradient color="white">
    <Box p={2} display="flex" alignItems="center">
      <IconButton color="inherit">
        <Icon />
      </IconButton>
      <Typography variant="h6">{t`controlPanel`}</Typography>
    </Box>
    <Typography variant="h1">404</Typography>
    <Typography variant="h3">{t`pageNotFound`}</Typography>
  </BackdropGradient>
)

export default Error404
