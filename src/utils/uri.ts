/**
 * Returns the last part of URI after the last /
 */
export const getUriFragment = (uri: string) => uri.split("/").pop();
