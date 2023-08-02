import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function NavigationBar() {

  let navigate = useNavigate();

  return (

    <Navbar className="justify-content-center">
      <Container>
        <Nav className="mx-auto">
          <Nav.Link onClick={() => {navigate('/n1')}}>n1</Nav.Link>
          <Nav.Link onClick={() => {navigate('/n2')}}>n2</Nav.Link>
          <Nav.Link onClick={() => {navigate('/n3')}}>n3</Nav.Link>
          <Nav.Link onClick={() => {navigate('/n4')}}>n4</Nav.Link>
          <Nav.Link onClick={() => {navigate('/n5')}}>n5</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
