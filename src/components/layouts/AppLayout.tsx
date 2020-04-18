import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdLayout from './IdLayout'
import MainLayout from './MainLayout'

const AppLayout: React.FC = () => (
  <Switch>
    <Route path="/id" component={IdLayout} />
    <Route path="/" component={MainLayout} />
  </Switch>
)

export default AppLayout
