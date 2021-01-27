import React from 'react'
import { Tabs } from '@material-ui/core'

import Routes from 'app/routes'
import RouteTab from 'app/components/RouteTab'
import useRoute from 'app/hooks/useRoute'
import t from 'app/components/i18n'

const Navigation: React.FC = () => {
  const { route } = useRoute()
  return (
    <Tabs variant="fullWidth" value={route.name}>
      <RouteTab label={t`login`} value={Routes.Login} />
      <RouteTab label={t`registration`} value={Routes.Registration} />
    </Tabs>
  )
}

export default Navigation
