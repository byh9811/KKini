import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import U1 from './U1.js'
import U2 from './U2.js'

function N3() {

  let [탭, 탭변경] = useState(0)

  return (
    <div>
      <Navbar className="justify-content-center">
        <Container>
          <Nav className="mx-auto" defaultActiveKey="link-0">
            <Nav.Link onClick={()=>{ 탭변경(0) }} eventKey="link-0">upload1</Nav.Link>
            <Nav.Link onClick={()=>{ 탭변경(1) }} eventKey="link-1">upload2</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <TabContent 탭={탭}></TabContent>
    </div>
  );
}

function TabContent(props) {
  if (props.탭 === 0) {
    return <U1></U1>
  } else {
    return <U2></U2>
  }
}

export default N3;
