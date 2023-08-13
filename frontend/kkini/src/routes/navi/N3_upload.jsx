import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import UploadPost from '../upload/UploadPost'
import UploadRecipes from '../upload/UploadRecipes.jsx'

function N3_upload() {
  window.scrollTo(0, 0);

  let [tab, setTab] = useState(0)

  return (
    <div style={{height: 'calc(var(--vh, 1vh) * 100)'}}>
      <Navbar className="justify-content-center">
        <Container>
          <Nav className="mx-auto" defaultActiveKey="link-0">
            <Nav.Link onClick={() => { setTab(0) }} eventKey="link-0">포스트</Nav.Link>
            <Nav.Link onClick={() => { setTab(1) }} eventKey="link-1">레시피</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {
        tab === 0
        ? <UploadPost></UploadPost>
        : <UploadRecipes></UploadRecipes>
      }
    </div>
  );
}

export default N3_upload;
