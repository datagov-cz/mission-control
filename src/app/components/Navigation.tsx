import React from 'react'
import { Tabs } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

import RouteTab from 'components/ui/RouteTab'

const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <Tabs
      variant="fullWidth"
      value={location.pathname}
      aria-label="nav tabs example"
    >
      <RouteTab label="Dashboard" value="/" />
      <RouteTab label="Users" value="/users" />
    </Tabs>
  )
}

export default Navigation
