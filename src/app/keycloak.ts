import Keycloak from 'keycloak-js'

import { KEYCLOAK_CONFIG } from 'app/variables'
import { setToken } from 'utils/auth'

const keycloak = Keycloak(KEYCLOAK_CONFIG)

keycloak.onAuthSuccess = () => setToken(`Bearer ${keycloak.token}`)

keycloak.onTokenExpired = () => keycloak.updateToken(5)

const keycloakPromise = keycloak.init({ onLoad: 'login-required' })

export default keycloakPromise
