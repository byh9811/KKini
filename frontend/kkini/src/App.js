import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Naver from "./routes/Naver.jsx"
import Home from './routes/Home.jsx';
import Redirect from './routes/Redirect.jsx';
import Login from './routes/Login.jsx';
import N1 from './routes/N1.jsx'
import N2 from './routes/N2.jsx'
import N3 from './routes/N3.jsx'
import N4 from './routes/N4.jsx'
import N5 from './routes/N5.jsx'

// App.js
function App() {
  return (
    <div className="App">
      <Logo src="img/logo.png" alt="로고" />
      <h2 style={{ margin: '0 auto' }}>끼니에 어서오세요!</h2>
      <Naver></Naver>
      <div className="App">
        <Routes>
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />}> {/* Home 컴포넌트를 루트 경로로 정의 */}
            <Route path="n1" element={<N1 />} />
            <Route path="n2" element={<N2 />} />
            <Route path="n3" element={<N3 />} />
            <Route path="n4" element={<N4 />} />
            <Route path="n5" element={<N5 />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

const Logo = styled.img`
    width: 300px;
    height: 300px;
    margin: 0 auto;
    `