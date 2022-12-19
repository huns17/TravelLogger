import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: "url",
  realm: "relam",
  clientId: "React-auth",
});

export default keycloak;
