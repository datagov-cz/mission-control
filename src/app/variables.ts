/**
 * API URL base
 */
export const API_URL =
  process.env.REACT_APP_API_URL || 'https://kbss.felk.cvut.cz/sgov-server'

/**
 * Default vocabulary to include in each workspace
 */
export const DEFAULT_VOCABULARY_IRI = 'https://slovník.gov.cz/veřejný-sektor'

const NS_PRACOVNI_PROSTOR =
  'https://slovník.gov.cz/datový/pracovní-prostor/pojem/'

const ns = (prefix: string) => (suffix: string) => `${prefix}${suffix}`

const nspp = ns(NS_PRACOVNI_PROSTOR)

export const VOCABULARY_CONTEXT_READ_ONLY = nspp(
  'slovníkový-kontext-pouze-pro-čtení'
)

const KEYCLOAK_URL = 'https://kbss.felk.cvut.cz:10808/auth'

const KEYCLOAK_REALM = 'kodi-dev'

const KEYCLOAK_CLIENT_ID = 'kodi-mission-control-dev'

export const KEYCLOAK_CONFIG = {
  url: KEYCLOAK_URL,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
}
