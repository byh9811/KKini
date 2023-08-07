import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Usname from '../components/Usname';
import Feedname from '../components/Feedname';
import SearchBar from '../components/SearchBar';

function N2() {
  window.scrollTo(0, 0);
  
  let [탭, 탭변경] = useState(0);
  let [showResults, setShowResults] = useState(false);

  const handleSearch = (query) => {
    // 여기서 query를 사용하여 검색을 수행할 수 있습니다.
    setShowResults(true);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch}></SearchBar>
      {showResults && (
        <>
          <Navbar className="justify-content-center">
            <Container>
              <Nav className="mx-auto" defaultActiveKey="link-0">
                <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link-0">사용자 이름 검색결과</Nav.Link>
                <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link-1">내용 검색결과</Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <TabContent 탭={탭}></TabContent>
        </>
      )}
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
