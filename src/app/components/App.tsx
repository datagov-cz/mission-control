import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import { I18nProvider, Namespace } from 'app/components/i18n'

import store from 'app/store'
import router from 'app/router'
import theme from 'app/theme'
import InitBoundary from './InitBoundary'
import Snackbar from './Snackbar'
import RouteComponentRenderer from './RouteComponentRenderer'

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <I18nProvider>
      <Namespace.Provider value="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router}>
            <InitBoundary>
              <RouteComponentRenderer />
              <Snackbar />
            </InitBoundary>
          </RouterProvider>
        </ThemeProvider>
      </Namespace.Provider>
    </I18nProvider>
  </ReduxProvider>
)

export default App
