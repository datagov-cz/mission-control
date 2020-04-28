import React from 'react'
import { Tabs } from '@material-ui/core'

import RouteTab from 'app/components/RouteTab'
import t from 'app/components/i18n'
import useRoute from 'app/hooks/useRoute'

const Navigation: React.FC = () => {
  const { topRoute } = useRoute()
  return (
    <Tabs variant="fullWidth" value={topRoute.name}>
      <RouteTab label={t`dashboard`} value="dashboard" />
      <RouteTab label={t`users`} value="users" />
    </Tabs>
  )
}

export default Navigation
