import en from './en.json'
import cs from './cs.json'

const allTranslations = {
  en,
  cs,
}

const supportedLocales = Object.keys(allTranslations)

// Gets user's browser locale settings
const navigatorLocale = navigator.language.split(/[-_]/)[0]

type Locale = keyof typeof allTranslations

// Picks user's browser locale if the relevant translation file exists, otherwise defaults to en.
export const locale = (supportedLocales.includes(navigatorLocale)
  ? navigatorLocale
  : supportedLocales[0]) as Locale

export const messages = allTranslations[locale]
