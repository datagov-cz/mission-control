/**
 * Helper to make sure that all envs are defined properly
 * @param name env variable name
 */
const getEnv = (name: string): string => {
  const value = process.env[`REACT_APP_${name}`]
  if (value) {
    return value
  }
  throw new Error(`Missing environment variable: REACT_APP_${name}`)
}

/**
 * API URL base
 */
export const API_URL = getEnv('API_URL')

/**
 * App deploy URL base
 */
const CONTEXT = getEnv('CONTEXT')
const PRODUCTION_URL = getEnv('PRODUCTION_URL')
const DEVELOPMENT_URL = getEnv('DEVELOPMENT_URL')
const APP_URL = CONTEXT === 'production' ? PRODUCTION_URL : DEVELOPMENT_URL

/**
 * OIDC variables
 */
const OIDC_AUTHORITY = getEnv('OIDC_AUTHORITY')
const OIDC_CLIENT_ID = getEnv('OIDC_CLIENT_ID')

export const OIDC_CONFIG = {
  authority: OIDC_AUTHORITY,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: `${APP_URL}/oidc-signin-callback.html?forward_uri=${encodeURI(
    APP_URL
  )}`,
  silent_redirect_uri: `${APP_URL}/oidc-silent-callback.html`,
  post_logout_redirect_uri: APP_URL,
  response_type: 'code',
  loadUserInfo: true,
  automaticSilentRenew: true,
  revokeAccessTokenOnSignout: true,
}

export const generateRedirectUri = (forwardUri: string) =>
  `${APP_URL}/oidc-signin-callback.html?forward_uri=${encodeURI(forwardUri)}`

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
