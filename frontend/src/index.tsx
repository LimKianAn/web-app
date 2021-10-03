import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import keycloak from "./pkg/keycloak";

const render = () =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );

keycloak.init(render);
