import appEn from './en.json'
import appCs from './cs.json'
import idEn from 'id/translations/en.json'
import idCs from 'id/translations/cs.json'
import dashboardEn from 'dashboard/translations/en.json'
import dashboardCs from 'dashboard/translations/cs.json'
import usersEn from 'users/translations/en.json'
import usersCs from 'users/translations/cs.json'
import workspacesEn from 'workspaces/translations/en.json'
import workspacesCs from 'workspaces/translations/cs.json'

const NAMESPACE_SEPARATOR = '.'
const APP = 'app'
const ID = 'id'
const DASHBOARD = 'dashboard'
const USERS = 'users'
const WORKSPACES = 'workspaces'

const prefix = (translations: Object, namespace: string) =>
  Object.entries(translations).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      acc[`${namespace}${NAMESPACE_SEPARATOR}${key}`] = value
      return acc
    },
    {}
  )

const translations = {
  en: {
    ...prefix(appEn, APP),
    ...prefix(idEn, ID),
    ...prefix(dashboardEn, DASHBOARD),
    ...prefix(usersEn, USERS),
    ...prefix(workspacesEn, WORKSPACES),
  },
  cs: {
    ...prefix(appCs, APP),
    ...prefix(idCs, ID),
    ...prefix(dashboardCs, DASHBOARD),
    ...prefix(usersCs, USERS),
    ...prefix(workspacesCs, WORKSPACES),
  },
}

export default translations
