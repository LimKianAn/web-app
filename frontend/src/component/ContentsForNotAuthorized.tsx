import { FC } from "react";
import { Col, Row } from "react-bootstrap";

export const ContentsForNotAuthorized: FC = () => {
  return (
    <Row className="justify-content-center">
      <Col md="auto">
        <h1>You are not authorized.</h1>
      </Col>
    </Row>
  );
};

export default ContentsForNotAuthorized;
