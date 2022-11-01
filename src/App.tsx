import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./Router";
import { I18nProvider, Namespace } from "./components/i18n";
import { Locale } from "./@types";
import { getLocale, setLocale } from "./utils/i18n";
import { Button, ThemeProvider } from "@mui/material";
import theme from "./app/theme";
import LanguageContext from "./LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {

  const [language, setLanguage] = useState(getLocale());
  const saveLanguage = (language: Locale) => {
    setLocale(language);
    setLanguage(language);
  };

  const value = { language, saveLanguage };
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={value}>
        <I18nProvider language={language}>
          <ThemeProvider theme={theme}>
            <Namespace.Provider value="common">
              <React.Suspense fallback={<div>Loading...</div>}>
                <Router />
              </React.Suspense>
              <ToastContainer/>
            </Namespace.Provider>
          </ThemeProvider>
        </I18nProvider>
        <ReactQueryDevtools initialIsOpen />
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
