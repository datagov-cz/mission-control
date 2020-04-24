import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { IntlProvider } from 'react-intl'

import { Namespace } from 'components/i18n'

import store, { history } from 'app/store'
import theme from 'app/theme'
import { locale, messages } from 'app/translations'
import AppLayout from './AppLayout'
import InitBoundary from './InitBoundary'

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <Namespace.Provider value="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ConnectedRouter history={history}>
            <InitBoundary>
              <AppLayout />
            </InitBoundary>
          </ConnectedRouter>
        </ThemeProvider>
      </Namespace.Provider>
    </IntlProvider>
  </ReduxProvider>
)

export default App
