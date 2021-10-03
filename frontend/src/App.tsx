import { Container, Row } from "react-bootstrap";
import ContentsForAuthorized from "./component/ContentsForAuthorized";
import ContentsForNotAuthorized from "./component/ContentsForNotAuthorized";
import ContentsForNotAuthenticated from "./component/ContentsForNotAuthenticated";
import MyNavbar from "./component/MyNavBar";
import keycloak from "./pkg/keycloak";
import "./App.scss";

function App() {
  return (
    <Container fluid>
      <Row>
        <MyNavbar />
      </Row>
      {keycloak.isAuthorized() ? (
        <ContentsForAuthorized />
      ) : keycloak.isAuthenticated() ? (
        <ContentsForNotAuthorized />
      ) : (
        <ContentsForNotAuthenticated />
      )}
    </Container>
  );
}

export default App;
