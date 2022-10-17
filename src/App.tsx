import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./Router";
import { I18nProvider, Namespace } from "./components/i18n";
import { Locale } from "./@types";
import {getLocale, setLocale} from "./utils/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {

  const [language, setLanguage] = useState(getLocale());
  const saveLanguage = (language:Locale) => {
    setLocale(language);
    setLanguage(language);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider language={language}>
        <Namespace.Provider value="common">
          <Router setLanguage={saveLanguage} />
        </Namespace.Provider>
      </I18nProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
