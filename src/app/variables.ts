import { Env } from "@opendata-mvcr/assembly-line-shared";

type LocalVars =
  | "PUBLIC_URL"
  | "NETLIFY"
  | "NETLIFY_CONTEXT"
  | "NETLIFY_URL"
  | "NETLIFY_DEPLOY_PRIME_URL";
const env = new Env<LocalVars>(process.env);

/**
 * PUBLIC_URL contains production deployment path
 */
export const PUBLIC_PATH = env.get("PUBLIC_URL", "");

/**
 * Context spec - production or development
 */
export const CONTEXT = env.get("CONTEXT");

/**
 * Stable ID of the application
 */
export const ID = env.get("ID");

/**
 * App deploy URL base
 */
export const URL = (() => {
  if (env.get("NETLIFY", "false") === "false") {
    // Not running on Netlify
    return env.get("URL");
  } else if (env.get("NETLIFY_CONTEXT") === "production") {
    // Main production instance on Netlify
    return env.get("NETLIFY_URL");
  } else {
    // Deploy preview or branch deploy on Netlify
    return env.get("NETLIFY_DEPLOY_PRIME_URL");
  }
})();

/**
 * Components configuration
 */
export const COMPONENTS = env.getComponents();

/**
 * API URL base
 */
export const API_URL = COMPONENTS["al-sgov-server"].url;

/**
 * OIDC variables
 */
export const OIDC_CONFIG = {
  authority: COMPONENTS["al-auth-server"].url,
  client_id: ID,
  redirect_uri: `${URL}/oidc-signin-callback.html?forward_uri=${encodeURI(
    URL
  )}`,
  silent_redirect_uri: `${URL}/oidc-silent-callback.html`,
  post_logout_redirect_uri: URL,
  response_type: "code",
  loadUserInfo: true,
  automaticSilentRenew: true,
  revokeAccessTokenOnSignout: true,
};

export const generateRedirectUri = (forwardUri: string) =>
  `${URL}/oidc-signin-callback.html?forward_uri=${encodeURI(forwardUri)}`;

/**
 * Links to issue tracker regarding bugs and features
 */
export const BUG_TRACKER_URL = COMPONENTS["al-issue-tracker"].meta["new-bug"];
export const FEATURE_TRACKER_URL =
  COMPONENTS["al-issue-tracker"].meta["new-feature"];

const NS_PRACOVNI_PROSTOR =
  "https://slovník.gov.cz/datový/pracovní-prostor/pojem/";

const ns = (prefix: string) => (suffix: string) => `${prefix}${suffix}`;

const nspp = ns(NS_PRACOVNI_PROSTOR);

export const VOCABULARY_CONTEXT_READ_ONLY = nspp(
  "slovníkový-kontext-pouze-pro-čtení"
);
