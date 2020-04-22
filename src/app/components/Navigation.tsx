import React from 'react'
import { Tabs } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

import RouteTab from 'components/ui/RouteTab'
import t from 'components/t'

const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <Tabs
      variant="fullWidth"
      value={location.pathname}
      aria-label="nav tabs example"
    >
      <RouteTab label={t`dashboard`} value="/" />
      <RouteTab label={t`users`} value="/users" />
    </Tabs>
  )
}

export default Navigation
