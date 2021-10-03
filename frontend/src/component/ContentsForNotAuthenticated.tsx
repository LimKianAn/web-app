import { FC } from "react";
import { Col, Row } from "react-bootstrap";

export const ContentsForNotAuthenticated: FC = () => {
  return (
    <Row className="justify-content-center">
      <Col md="auto">
        <h1>Please sign in.</h1>
      </Col>
    </Row>
  );
};

export default ContentsForNotAuthenticated;
