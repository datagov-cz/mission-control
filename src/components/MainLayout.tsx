import React, { Suspense } from 'react'
import { Box } from '@material-ui/core'

import Header from './Header'
import Footer from './Footer'
import BackdropGrey from './BackdropGrey'
import RouteComponentRenderer from './RouteComponentRenderer'

const MainLayout: React.FC = () => {
  return (
    <BackdropGrey>
      <Header />
      <Box display="flex" flexGrow="1">
        <Suspense fallback={<></>}>
          <RouteComponentRenderer />
        </Suspense>
      </Box>
      <Footer />
    </BackdropGrey>
  )
}

export default MainLayout
