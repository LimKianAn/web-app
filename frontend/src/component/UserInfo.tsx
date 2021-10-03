import { FC } from "react";
import { Button } from "react-bootstrap";
import keycloak from "../pkg/keycloak";

const UserInfo: FC = () => {
  return keycloak.isAuthenticated() ? (
    <Button
      onClick={() => {
        keycloak.logout();
      }}
      size="sm"
      variant="primary"
      type="button"
    >
      Log Out
    </Button>
  ) : (
    <Button
      onClick={() => {
        keycloak.login();
      }}
      size="sm"
      variant="primary"
      type="button"
    >
      Log In
    </Button>
  );
};

export default UserInfo;
