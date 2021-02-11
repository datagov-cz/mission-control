import commonEn from './common.en.json'
import commonCs from './common.cs.json'
import workspacesEn from './workspaces.en.json'
import workspacesCs from './workspaces.cs.json'
import vocabulariesEn from './vocabularies.en.json'
import vocabulariesCs from './vocabularies.cs.json'

const NAMESPACE_SEPARATOR = '.'
const COMMON = 'common'
const WORKSPACES = 'workspaces'
const VOCABULARIES = 'vocabularies'

const prefix = (translations: Object, namespace: string) =>
  Object.entries(translations).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      acc[`${namespace}${NAMESPACE_SEPARATOR}${key}`] = value
      return acc
    },
    {}
  )

const i18n = {
  en: {
    ...prefix(commonEn, COMMON),
    ...prefix(workspacesEn, WORKSPACES),
    ...prefix(vocabulariesEn, VOCABULARIES),
  },
  cs: {
    ...prefix(commonCs, COMMON),
    ...prefix(workspacesCs, WORKSPACES),
    ...prefix(vocabulariesCs, VOCABULARIES),
  },
}

export default i18n
