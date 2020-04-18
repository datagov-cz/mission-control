import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { IntlProvider } from 'react-intl'

import store, { history } from 'store'
import theme from 'theme'
import { locale, messages } from 'translations'
import AppLayout from 'components/layouts/AppLayout'

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
