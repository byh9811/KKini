import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import FeedComponent from '../components/FeedComponent';

import Search from '../components/Search';
import ReqUserPostCard from '../components/ReqUserPostCard'

const N4 = () => {
  window.scrollTo(0, 0);
  const [카테고리, 카테고리변경] = useState("");
  let [검색어, 검색어변경] = useState("");

  // 전체 / 한 / 중 / 일 / 양 / 기타
  return (
    <div>
      <Search onSearchChange={검색어변경}></Search>
      {검색어.trim() !== "" && (
        <div>
          <Navbar className="justify-content-center">
            <Container>
              <Nav className="mx-auto" defaultActiveKey="link-0">
                <Nav.Link onClick={() => { 카테고리변경('') }} eventKey="link-0">전체</Nav.Link>
                <Nav.Link onClick={() => { 카테고리변경('한식') }} eventKey="link-1">한식</Nav.Link>
                <Nav.Link onClick={() => { 카테고리변경('중식') }} eventKey="link-3">중식</Nav.Link>
                <Nav.Link onClick={() => { 카테고리변경('일식') }} eventKey="link-4">일식</Nav.Link>
                <Nav.Link onClick={() => { 카테고리변경('양식') }} eventKey="link-5">양식</Nav.Link>
                <Nav.Link onClick={() => { 카테고리변경('기타') }} eventKey="link-6">기타</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      )}
      <div>
        {검색어.trim() !== "" ? <FeedComponent 검색어={검색어} 카테고리={카테고리} 분류={1}/> : null}
        <div className='flex flex-wrap'>
            {[1, 1, 1, 1, 1, 1].map((item)=><ReqUserPostCard></ReqUserPostCard>)}
        </div>
      </div>
    </div>
  );
};

export default N4;
