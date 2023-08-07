import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import U1 from './U1.jsx'
import U2 from './U2.jsx'

function N3() {
  window.scrollTo(0, 0);

  let [tab, setTab] = useState(0)

  return (
    <div>
      <Navbar className="justify-content-center">
        <Container>
          <Nav className="mx-auto" defaultActiveKey="link-0">
            <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link-0">포스트</Nav.Link>
            <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link-1">레시피</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <TabContent tab={tab}></TabContent>
    </div>
  );
}

function TabContent(props) {
  if (props.tab === 0) {
    return <U1></U1>
  } else {
    return <U2></U2>
  }
}

export default N3;
