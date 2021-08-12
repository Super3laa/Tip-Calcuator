import React from "react";
import { Container,Row,Col } from 'reactstrap';
export default function ResultRow(props) {
  return (
    <Row>
      <Col xs={12}>
        <Container>
          <Row>
            <Col >
              <Container>
                <Row>
                  <Col className="ResultsHeader">{props.data.title}</Col>
                </Row>
                <Row>
                  <Col className="ResultsSubTitle">{props.data.subTitle}</Col>
                </Row>
              </Container>
            </Col>
            <Col >
            <Container>
                <Row>
                <Col className="ResultsPrice">{props.data.price}</Col>
                </Row>
            </Container>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}
