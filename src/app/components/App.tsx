import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { IntlProvider } from 'react-intl'

import { Namespace } from 'app/components/i18n'

import store from 'app/store'
import router from 'app/router'
import theme from 'app/theme'
import { locale, messages } from 'app/translations'
import InitBoundary from './InitBoundary'
import Snackbar from './Snackbar'
import RouteComponentRenderer from './RouteComponentRenderer'
import Error404 from './Error404'

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <Namespace.Provider value="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router}>
            <InitBoundary>
              <RouteComponentRenderer />
              <Error404 />
              <Snackbar />
            </InitBoundary>
          </RouterProvider>
        </ThemeProvider>
      </Namespace.Provider>
    </IntlProvider>
  </ReduxProvider>
)

export default App
