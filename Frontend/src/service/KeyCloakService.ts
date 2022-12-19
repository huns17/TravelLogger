import kc from "../Keycloak";

//  Keycloak service Api
const doLogin = kc.login;

const doLogout = kc.logout;

const getToken = () => kc.token;

const isLoggedIn = () => !!kc.token;

const updateToken = (successCallback: any) =>
  kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => kc.tokenParsed?.preferred_username;

const getClientRole = () => kc?.tokenParsed?.resource_access?.echoMe?.roles;

const KeyCloakService = {
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  getClientRole,
};

export default KeyCloakService;
