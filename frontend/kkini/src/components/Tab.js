import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function Tab() {

  let navigate = useNavigate();
  
  return (
    <Navbar className="justify-content-center">
      <Container>
        <Nav className="mx-auto">
          <Nav.Link onClick={() => {navigate('/upload1')}}>upload1</Nav.Link>
          <Nav.Link onClick={() => {navigate('/upload2')}}>upload2</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Tab;
