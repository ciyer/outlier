import { Col, Row } from "reactstrap";

// Spinner from https://loading.io/css/
export default function LoadingSpinner() {
  return (
    <Row>
      <Col xs={{ offset: 6 }}>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Col>
    </Row>
  );
}
