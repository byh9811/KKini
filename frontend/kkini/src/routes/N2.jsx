import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import FeedComponent from '../components/FeedComponent';
import AccountComponent from '../components/AccountComponent';

import Search from '../components/Search';

const N2 = () => {
  window.scrollTo(0, 0);
  let [탭, 탭변경] = useState(0);
  let [검색어, 검색어변경] = useState("");

  return (
    <div>
      <Search onSearchChange={검색어변경}></Search>
      {검색어.trim() !== "" && (
        <div>
          <Navbar className="justify-content-center">
            <Container>
              <Nav className="mx-auto" defaultActiveKey="link-0">
                <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link-0">피드</Nav.Link>
                <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link-1">계정</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      )}
      <div>
        {검색어.trim() !== "" && 탭 === 0 ? <FeedComponent 검색어={검색어} 카테고리={''}/> : null}
        {검색어.trim() !== "" && 탭 === 1 ? <AccountComponent 검색어={검색어} /> : null}
      </div>
    </div>
  );
};

export default N2;
