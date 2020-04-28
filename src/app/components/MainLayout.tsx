import React from 'react'

import Header from './Header'
import BackdropGrey from './BackdropGrey'
import RouteComponentRenderer from './RouteComponentRenderer'

const MainLayout: React.FC = () => {
  return (
    <BackdropGrey>
      <Header />
      <RouteComponentRenderer />
    </BackdropGrey>
  )
}

export default MainLayout
