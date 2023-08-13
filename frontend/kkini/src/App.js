import './App.css'
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/pages/Home.jsx';
import Redirect from './routes/login/Redirect.jsx';
import N1 from './routes/navi/N1_home.jsx'
import N2 from './routes/navi/N2_search.jsx'
import N3 from './routes/navi/N3_upload.jsx'
import N4 from './routes/navi/N4_recipe.jsx'
import N5_mypage from './routes/navi/N5_mypage.jsx'
import "tailwindcss/tailwind.css";
import Naver from './routes/login/Naver';
import Withdrawal from './routes/login/Withdrawal';
import FollowList from './components/mypage/FollowList';

// App.js
function App() {
  const [isLogIn, setIsLogIn ] = useState(false);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className="App">
      <div style={{ margin: '0 auto' }}>
      </div>
      <Routes>
      <Route path="/" element={isLogIn ? <Home/> : <Navigate to="/naver" />} />
        <Route path="/redirect" element={<Redirect  setIsLogIn={setIsLogIn}/>} />
        <Route path="/naver" element={<Naver/>} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/followlist/:userId?" element={<FollowList />}/>
        <Route path="/home/*" element={<Home />}>
          <Route path="n1" element={<N1 />} />
          <Route path="n2" element={<N2 />} />
          <Route path="n3" element={<N3 />} />
          <Route path="n4" element={<N4 />} />
          <Route path="n5/:userId?" element={<N5_mypage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;