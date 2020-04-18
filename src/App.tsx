import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import store, { history } from './store'
import theme from './theme'
import AppLayout from 'components/layouts/AppLayout'

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConnectedRouter history={history}>
        <AppLayout />
      </ConnectedRouter>
    </ThemeProvider>
  </ReduxProvider>
)

export default App
