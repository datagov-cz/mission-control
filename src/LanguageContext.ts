import React from "react";
import { Locale } from "./@types";

// set the defaults
const LanguageContext = React.createContext({
  language: "en" as Locale,
  saveLanguage: (language: Locale) => {},
});

export default LanguageContext;
