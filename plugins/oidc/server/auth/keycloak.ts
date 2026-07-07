const KEYCLOAK_AUTH_ENDPOINT_SUFFIX = "/protocol/openid-connect/auth";

/**
 * Derives the Keycloak end-session endpoint from its authorization endpoint.
 *
 * Keycloak exposes all OIDC endpoints under a common
 * `…/realms/{realm}/protocol/openid-connect/` path, so when a logout endpoint
 * has not been explicitly configured it can be derived by swapping the last
 * path segment of the authorization endpoint.
 *
 * @param authorizationURL the configured OIDC authorization endpoint.
 * @returns the corresponding end-session endpoint, or undefined when the URL
 * does not match the Keycloak endpoint layout.
 */
export function deriveKeycloakLogoutUrl(
  authorizationURL: string | undefined
): string | undefined {
  if (!authorizationURL) {
    return undefined;
  }

  try {
    const url = new URL(authorizationURL);

    if (!url.pathname.endsWith(KEYCLOAK_AUTH_ENDPOINT_SUFFIX)) {
      return undefined;
    }

    url.pathname = url.pathname.replace(/\/auth$/, "/logout");
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch (_err) {
    return undefined;
  }
}
