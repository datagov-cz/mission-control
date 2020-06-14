import translations from 'app/translations'
import { Locale } from 'app/types'

const I18N_KEY = 'I18N'

export const setLocale = (locale: string): void =>
  localStorage.setItem(I18N_KEY, locale)

const getDefaultLocale = () => {
  const supportedLocales = Object.keys(translations)

  // Gets user's browser locale settings
  const navigatorLocale = navigator.language.split(/[-_]/)[0]

  // Picks user's browser locale if the relevant translation file exists, otherwise defaults to en.
  return (supportedLocales.includes(navigatorLocale)
    ? navigatorLocale
    : supportedLocales[0]) as Locale
}

export const getLocale = (): Locale =>
  (localStorage.getItem(I18N_KEY) as Locale) || getDefaultLocale()
