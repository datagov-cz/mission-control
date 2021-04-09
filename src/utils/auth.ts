import { User } from "oidc-client";
import { OIDC_CONFIG } from "app/variables";

const OIDC_IDENTITY_STORAGE_KEY = `oidc.user:${OIDC_CONFIG.authority}:${OIDC_CONFIG.client_id}`;

export const getToken = (): string => {
  const identityData = sessionStorage.getItem(OIDC_IDENTITY_STORAGE_KEY);
  const identity = identityData
    ? JSON.parse(identityData)
    : (null as User | null);
  return `${identity?.token_type} ${identity?.access_token}`;
};
