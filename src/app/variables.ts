import YAML from 'yaml'

import { Components } from '@types'

const ENV = {
  ...Object.keys(process.env).reduce<Record<string, string>>((acc, key) => {
    const strippedKey = key.replace('REACT_APP_', '')
    acc[strippedKey] = process.env[key]!
    return acc
  }, {}),
  ...(window as any).__config__,
}

/**
 * Helper to make sure that all envs are defined properly
 * @param name env variable name
 */
const getEnv = (name: string, defaultValue?: string): string => {
  const value = ENV[name] || defaultValue
  if (value) {
    return value
  }
  throw new Error(`Missing environment variable: ${name}`)
}

/**
 * Context spec - production or development
 */
export const CONTEXT = getEnv('CONTEXT')

/**
 * Stable ID of the application
 */
export const ID = getEnv('ID')

/**
 * App deploy URL base
 */
export const URL = (() => {
  if (getEnv('NETLIFY', 'false') === 'false') {
    // Not running on Netlify
    return getEnv('URL')
  } else if (getEnv('NETLIFY_CONTEXT') === 'production') {
    // Main production instance on Netlify
    return getEnv('NETLIFY_URL')
  } else {
    // Deploy preview or branch deploy on Netlify
    return getEnv('NETLIFY_DEPLOY_PRIME_URL')
  }
})()

/**
 * Components configuration
 */
export const COMPONENTS: Components = (() => {
  const base64String = getEnv('COMPONENTS')
  try {
    // Use TextDecoder interface to properly decode UTF-8 characters
    const yamlString = new TextDecoder('utf-8').decode(
      Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0))
    )
    return YAML.parse(yamlString)
  } catch (error: any) {
    console.error(error)
    throw new Error('Unable to decode COMPONENTS configuration')
  }
})()

/**
 * API URL base
 */
export const API_URL = COMPONENTS.sgovServer.url

/**
 * OIDC variables
 */
export const OIDC_CONFIG = {
  authority: COMPONENTS.authServer.url,
  client_id: ID,
  redirect_uri: `${URL}/oidc-signin-callback.html?forward_uri=${encodeURI(
    URL
  )}`,
  silent_redirect_uri: `${URL}/oidc-silent-callback.html`,
  post_logout_redirect_uri: URL,
  response_type: 'code',
  loadUserInfo: true,
  automaticSilentRenew: true,
  revokeAccessTokenOnSignout: true,
}

export const generateRedirectUri = (forwardUri: string) =>
  `${URL}/oidc-signin-callback.html?forward_uri=${encodeURI(forwardUri)}`

/**
 * Links to issue tracker regarding bugs and features
 */
export const BUG_TRACKER_URL = COMPONENTS.issueTracker.meta.newBug
export const FEATURE_TRACKER_URL = COMPONENTS.issueTracker.meta.newFeature

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
