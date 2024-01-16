import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
      keycloak.init({
          config: {
            url: 'http://192.168.10.44:9001/',
            realm: 'funeral-services',
            clientId: 'funeral-services-admin',
              },
          initOptions: {
            onLoad:'check-sso',
              checkLoginIframe: false,
              checkLoginIframeInterval: 25
          },
          loadUserProfileAtStartUp: true
      });
}
