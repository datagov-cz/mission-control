import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

import { Locale } from "@types";

import {
  setLocale as setLocaleToStorage,
  getLocale as getLocaleFromStorage,
} from "utils/i18n";

export const locale$ = new BehaviorSubject(getLocaleFromStorage());

locale$.pipe(tap(setLocaleToStorage)).subscribe();

export const setLocale = (locale: Locale) => locale$.next(locale);
