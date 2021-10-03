import Keycloak from "keycloak-js";
import { authorizedUser } from "./remoteResource";

const k = Keycloak("/auth/keycloak.json");

k.onTokenExpired = () => {
  k.updateToken(5)
    .then((isRefreshed) => {
      if (isRefreshed) storeTokens();
    })
    .catch(() => k.login());
};

const clearTokens = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(refreshTokenKey);
};

const tokenKey = "keycloak-token";
const refreshTokenKey = "keycloak-refresh-token";

interface rolesOfToken {
  roles: string[];
}

const init = (callback: () => void): Promise<void> => {
  const token = localStorage.getItem(tokenKey);
  const refreshToken = localStorage.getItem(refreshTokenKey);
  const options: Keycloak.KeycloakInitOptions =
    token && refreshToken ? { token, refreshToken } : {};

  return k
    .init(options)
    .then((isAuthenticated) => {
      if (isAuthenticated) storeTokens();

      callback();
    })
    .catch((e) => {
      console.log(e);
      alert("failed to connect to KeyCloak");
    });
};

const isAuthorized = (): boolean => {
  return roles().includes(authorizedUser);
};

const isLoggedIn = (): boolean => !!k.token;

const login = k.login;
const logout = (): void => {
  clearTokens();
  k.logout();
};

const storeTokens = () => {
  localStorage.setItem(tokenKey, k.token as string);
  localStorage.setItem(refreshTokenKey, k.refreshToken as string);
};

const roles = (): string[] => {
  if (k.tokenParsed) return (k.tokenParsed as rolesOfToken).roles;
  return [];
};

const token = () => localStorage.getItem(tokenKey);

const keycloak = { init, isAuthorized, isAuthenticated: isLoggedIn, token, login, logout };
export default keycloak;
