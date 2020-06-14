import React from 'react'
import { Tabs } from '@material-ui/core'

import RouteTab from 'app/components/RouteTab'
import t from 'app/components/i18n'
import useRoute from 'app/hooks/useRoute'

const Navigation: React.FC = () => {
  const { topRoute } = useRoute()
  const availableTabs = ['workspaces', 'users']
  const currentTab = availableTabs.includes(topRoute.name)
    ? topRoute.name
    : false
  return (
    <Tabs value={currentTab}>
      <RouteTab label={t`workspaces.workspaces`} value="workspaces" />
      <RouteTab label={t`users.users`} value="users" />
    </Tabs>
  )
}

export default Navigation
