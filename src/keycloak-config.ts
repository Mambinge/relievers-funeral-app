import { KeycloakConfig } from "keycloak-js";


const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.10.44:9001/auth',
  realm: 'funeral-services',
  clientId: 'funeral-service-admin',
};

export default keycloakConfig;
