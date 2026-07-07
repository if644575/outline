import { deriveKeycloakLogoutUrl } from "./keycloak";

describe("deriveKeycloakLogoutUrl", () => {
  it("should derive the logout endpoint from a Keycloak authorization endpoint", () => {
    expect(
      deriveKeycloakLogoutUrl(
        "https://sso.example.com/realms/myrealm/protocol/openid-connect/auth"
      )
    ).toEqual(
      "https://sso.example.com/realms/myrealm/protocol/openid-connect/logout"
    );
  });

  it("should support the legacy /auth relative path", () => {
    expect(
      deriveKeycloakLogoutUrl(
        "https://sso.example.com/auth/realms/myrealm/protocol/openid-connect/auth"
      )
    ).toEqual(
      "https://sso.example.com/auth/realms/myrealm/protocol/openid-connect/logout"
    );
  });

  it("should strip query strings and fragments", () => {
    expect(
      deriveKeycloakLogoutUrl(
        "https://sso.example.com/realms/myrealm/protocol/openid-connect/auth?kc_idp_hint=github#top"
      )
    ).toEqual(
      "https://sso.example.com/realms/myrealm/protocol/openid-connect/logout"
    );
  });

  it("should return undefined for non-Keycloak endpoints", () => {
    expect(
      deriveKeycloakLogoutUrl("https://accounts.google.com/o/oauth2/v2/auth")
    ).toBeUndefined();
    expect(deriveKeycloakLogoutUrl("https://example.com/auth")).toBeUndefined();
  });

  it("should return undefined for missing or invalid input", () => {
    expect(deriveKeycloakLogoutUrl(undefined)).toBeUndefined();
    expect(deriveKeycloakLogoutUrl("not a url")).toBeUndefined();
  });
});
