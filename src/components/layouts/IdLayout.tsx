import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from 'components/id/Login'

const IdLayout: React.FC = () => (
  <Switch>
    <Route exact path="/id" component={Login} />
  </Switch>
)

export default IdLayout
