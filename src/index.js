import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col
}from "reactstrap";
ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Row>
        <Col className="logoCol">
        <p className="logo">S P L I</p>
        <p className="logo">T T E R</p>
        </Col>
      </Row>
      <Row>
      <App />
      </Row>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
