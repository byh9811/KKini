import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Tab() {
    return (
      <Navbar className="justify-content-center">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default Tab;
