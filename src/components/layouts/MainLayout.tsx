import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Dashboard from 'components/dashboard/Dashboard'
import Users from 'components/users/Users'

const MainLayout: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/users" component={Users} />
    </Switch>
  </>
)

export default MainLayout
