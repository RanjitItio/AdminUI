import React from 'react';
import { Main,DrawerHeader } from '../Content';
import { Container, Row, Col, Card, Button, Nav, Tab } from 'react-bootstrap';
import { FaBitcoin, FaEthereum,FaDog } from 'react-icons/fa'; // Use icons for different cryptocurrencies

const Crypto = ( {open}) => {
  return (
    <Main open={open}>
        <DrawerHeader />
        <Container fluid>
      <Tab.Container defaultActiveKey="blocklo">
        <Row className="my-3">
          <Col>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="blocklo">Blocklo</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tatumlo">Tatumlo</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Tab.Content>
          <Tab.Pane eventKey="blocklo">
            <Row>
              <Col className="d-flex align-items-center justify-content-between mb-3">
                <h3>Blocklo <span className="text-success">(Viking) <span className="badge bg-success">Active</span></span></h3>
                <Button variant="primary">+ Add New Asset</Button>
              </Col>
            </Row>
            <Row>
              <Col md={6} lg={4} className="mb-3">
                <Card className='shadow' style={{width: '20rem'}}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title>Litecoin (Test) <span className="badge bg-success">Active</span></Card.Title>
                      <FaEthereum size={32} />
                    </div>
                    <Card.Text>
                      <strong>Merchant Address:</strong> QY12HwCwDULZmWeEjKQxX3sX7pCDJ1wcRJ
                    </Card.Text>
                    <Row>
                      <Col>
                        <strong>Account Balance:</strong>
                        <p>Ł 0.246895</p>
                      </Col>
                      <Col>
                        <strong>Merchant Balance:</strong>
                        <p>Ł 0.199339</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Network Code:</strong>
                        <p>LTC TEST</p>
                      </Col>
                      <Col>
                        <strong>Max Api Request:</strong>
                        <p>150000 Daily</p>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary">Send</Button>
                      <Button variant="secondary">Receive</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={4} className="mb-3">
                <Card className='shadow' style={{width: '20rem'}}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title>Bitcoin <span className="badge bg-success">Active</span></Card.Title>
                      <FaBitcoin size={32} />
                    </div>
                    <Card.Text>
                      <strong>Merchant Address:</strong> 3AUwaM2WTQWbwQXyY4c5q6AsgcoDTaX1pC
                    </Card.Text>
                    <Row>
                      <Col>
                        <strong>Account Balance:</strong>
                        <p>B 0</p>
                      </Col>
                      <Col>
                        <strong>Merchant Balance:</strong>
                        <p>B 0</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Network Code:</strong>
                        <p>BTC</p>
                      </Col>
                      <Col>
                        <strong>Max Api Request:</strong>
                        <p>150000 Daily</p>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary">Send</Button>
                      <Button variant="secondary">Receive</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
          <Tab.Pane eventKey="tatumlo">
            <Row>
              <Col className="d-flex align-items-center justify-content-between mb-3">
                <h3>Tatumlo <span className="text-success">(Free) <span className="badge bg-success">Active</span></span></h3>
                <Button variant="primary">+ Add New Asset</Button>
              </Col>
            </Row>
            <Row>
              <Col md={6} lg={4} className="mb-3">
                <Card className='shadow' style={{width: '20rem'}}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title>Dogecoin <span className="badge bg-success">Active</span></Card.Title>
                      <FaDog size={32} />
                    </div>
                    <Card.Text>
                      <strong>Merchant Address:</strong> ndWBXBPiaov2dFqNmnfhX4tLGF7xJHBjbu
                    </Card.Text>
                    <Row>
                      <Col>
                        <strong>Account Balance:</strong>
                        <p>Ð 85.90789072</p>
                      </Col>
                      <Col>
                        <strong>Network Code:</strong>
                        <p>DOGE TEST</p>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary">Send</Button>
                      <Button variant="secondary">Receive</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
    </Main>
  );
}

export default Crypto;
