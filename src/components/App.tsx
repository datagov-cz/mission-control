import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  useObservableEagerState,
  useObservableSuspense,
} from "observable-hooks";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";

import { createLocalizedTheme } from "app/theme";

import { I18nProvider, Namespace } from "components/i18n";
import Snackbar from "components/Snackbar";
import Router from "./Router";
import { suspendResource } from "data/suspend";
import { locale$ } from "data/locale";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./Errors";
import Title from "./Title";

/**
 * This component prevents React immediate render if the suspend resource is true
 * The suspend value is to be set / unset while doing AJAX calls
 */
const Suspender: React.FC = () => {
  useObservableSuspense(suspendResource);
  return null;
};

const LocalizedThemeProvider: React.FC = ({ children }) => {
  const locale = useObservableEagerState(locale$);
  const theme = createLocalizedTheme(locale);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const App: React.FC = () => (
  <HelmetProvider>
    <I18nProvider>
      <Namespace.Provider value="common">
        <Title />
        <StyledEngineProvider injectFirst>
          <LocalizedThemeProvider>
            <CssBaseline />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={null}>
                <Suspender />
              </Suspense>
              <Suspense fallback={null}>
                <Router />
              </Suspense>
              <Snackbar />
            </ErrorBoundary>
          </LocalizedThemeProvider>
        </StyledEngineProvider>
      </Namespace.Provider>
    </I18nProvider>
  </HelmetProvider>
);

export default App;
