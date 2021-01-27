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

type ErrorProps = {
  code: number
  message: string
}

const Error: React.FC<ErrorProps> = ({ code, message }) => (
  <BackdropGradient color="white">
    <Box p={2} display="flex" alignItems="center">
      <IconButton color="inherit">
        <Icon />
      </IconButton>
      <Typography variant="h6">{t`controlPanel`}</Typography>
    </Box>
    <Typography variant="h1">{code}</Typography>
    <Typography variant="h3">{t(message)}</Typography>
  </BackdropGradient>
)

export const Error404 = () => <Error code={404} message={'pageNotFound'} />

export const Error500 = () => (
  <Error code={500} message={'somethingWentWrong'} />
)
