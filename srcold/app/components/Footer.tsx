import React from 'react'
import { Divider, Typography, Box, Container } from '@material-ui/core'

import t from 'app/components/i18n'

import opzLogo from './images/opz_logo.svg'

type FooterProps = {
  direction?: 'row' | 'column'
}

const Footer: React.FC<FooterProps> = ({ direction = 'row' }) => (
  <>
    <Divider />
    <Container>
      <Box
        my={1}
        display="flex"
        flexDirection={direction}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">
          {t`app.publicityFirstLine`}
          <br />
          {t`app.publicitySecondLine`}
        </Typography>
        <Box my={1} />
        <img src={opzLogo} alt="OPZ" height={50} />
      </Box>
    </Container>
  </>
)

export default Footer
