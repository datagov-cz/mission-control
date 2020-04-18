import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import IdLayout from 'components/id/IdLayout'
import ErrorsLayout from 'components/errors/ErrorsLayout'
import MainLayout from './MainLayout'

import Routes from 'routes'

const AppLayout: React.FC = () => (
  <Switch>
    <Route path={Routes.Id} component={IdLayout} />
    <Route path={Routes.Errors} component={ErrorsLayout} />
    <Route path={Routes.Main} component={MainLayout} />
    <Route exact path="*">
      <Redirect to={Routes.Error404} />
    </Route>
  </Switch>
)

export default AppLayout
