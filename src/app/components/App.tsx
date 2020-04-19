import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { IntlProvider } from 'react-intl'

import store, { history } from 'app/store'
import theme from 'app/theme'
import { locale, messages } from 'app/translations'
import AppLayout from './AppLayout'

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectedRouter history={history}>
          <AppLayout />
        </ConnectedRouter>
      </ThemeProvider>
    </IntlProvider>
  </ReduxProvider>
)

export default App
