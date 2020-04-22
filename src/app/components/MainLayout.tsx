import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'
import Dashboard from 'dashboard/components/Dashboard'
import Users from 'users/components/Users'
import Routes from 'app/routes'
import BackdropGrey from 'components/ui/BackdropGrey'

const MainLayout: React.FC = () => (
  <BackdropGrey>
    <Header />
    <Switch>
      <Route exact path={Routes.Dashboard} component={Dashboard} />
      <Route path={Routes.Users} component={Users} />
      <Route exact path="*">
        <Redirect to={Routes.Error404} />
      </Route>
    </Switch>
  </BackdropGrey>
)

export default MainLayout
