import React from 'react'
import { Tabs } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

import Routes from 'app/routes'
import RouteTab from 'components/ui/RouteTab'
import t from 'components/i18n'

const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <Tabs variant="fullWidth" value={location.pathname}>
      <RouteTab label={t`login`} value={Routes.Login} />
      <RouteTab label={t`registration`} value={Routes.Registration} />
    </Tabs>
  )
}

export default Navigation
