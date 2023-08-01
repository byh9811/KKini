import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar.js';

import N1 from './N1.js'
import N2 from './N2.js'
import N3 from './N3.js'
import N4 from './N4.js'
import N5 from './N5.js'

function Home({ onLogout }) {
  const handleLogout = () => { 
    onLogout();
  };

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/n1');
  }, []);

  return (
    <div>
      <h2>Main Page</h2>
      <p>메인 페이지에 오신 것을 환영합니다!</p>
      <button onClick={handleLogout}>로그아웃</button>

      <Routes>
        <Route path="/n1" element={<N1 />} />
        <Route path="/n2" element={<N2 />} />
        <Route path="/n3" element={<N3 />} />
        <Route path="/n4" element={<N4 />} />
        <Route path="/n5" element={<N5 />} />
      </Routes>

      <NavigationBar></NavigationBar>
    </div>
  );
}

export default Home;