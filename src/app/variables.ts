import { getEnvInstance } from "@opendata-mvcr/assembly-line-shared";

type LocalVars =
  | "PUBLIC_URL"
  | "NETLIFY"
  | "NETLIFY_CONTEXT"
  | "NETLIFY_URL"
  | "NETLIFY_DEPLOY_PRIME_URL";
const env = getEnvInstance<LocalVars>();

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
 * Links to issue tracker regarding bugs and features
 */
export const BUG_TRACKER_URL = COMPONENTS["al-issue-tracker"].meta["new-bug"];
export const FEATURE_TRACKER_URL =
  COMPONENTS["al-issue-tracker"].meta["new-feature"];

/**
 * Demo instance feature flag
 */
export const FEATURE_DEMO =
  COMPONENTS["al-mission-control"].meta["feature-demo"];

export const CHECKIT_URL = COMPONENTS["al-checkit-server"]?.url;
export const CHECKIT_FRONTED_URL = COMPONENTS["al-checkit-ui"]?.url;

const NS_PRACOVNI_PROSTOR =
  "https://slovník.gov.cz/datový/pracovní-prostor/pojem/";

const ns = (prefix: string) => (suffix: string) => `${prefix}${suffix}`;

const nspp = ns(NS_PRACOVNI_PROSTOR);

export const VOCABULARY_CONTEXT_READ_ONLY = nspp(
  "slovníkový-kontext-pouze-pro-čtení"
);
