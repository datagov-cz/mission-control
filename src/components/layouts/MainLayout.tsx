import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'
import Dashboard from 'components/dashboard/Dashboard'
import Users from 'components/users/Users'
import Routes from 'routes'

const MainLayout: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route exact path={Routes.Dashboard} component={Dashboard} />
      <Route path={Routes.Users} component={Users} />
      <Route exact path="*">
        <Redirect to={Routes.Error404} />
      </Route>
    </Switch>
  </>
)

export default MainLayout
