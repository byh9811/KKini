import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import RealSearch from './../components/RealSearch';
import SearchBar from '../components/SearchBar';
import Usname from '../components/Usname';
import Feedname from '../components/Feedname';

function N2() {
  let [탭, 탭변경] = useState(0);

  const handleSearchQuery = (query) => {
    // 여기에 검색 로직을 구현하고, 결과를 상태에 저장합니다.
    console.log("검색 쿼리:", query);
    // 예: 검색 결과를 서버로부터 가져오거나 필터링하여 화면에 표시
  };

  return (
    <div>
      <SearchBar onSearch={handleSearchQuery}></SearchBar>
      <Navbar className="justify-content-center">
        <Container>
          <Nav className="mx-auto" defaultActiveKey="link-0">
            <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link-0">사용자 이름 검색결과</Nav.Link>
            <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link-1">내용 검색결과</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <TabContent 탭={탭}></TabContent>
      n2입니다아아아
    </div>
  );
}

function TabContent(props) {
  if (props.탭 === 0) {
    return <Usname></Usname>;
  } else {
    return <Feedname></Feedname>;
  }
}

export default N2;
