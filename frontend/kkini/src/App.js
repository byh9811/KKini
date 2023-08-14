import './App.css'
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/pages/Home.jsx';
import Redirect from './routes/login/Redirect.jsx';
import N1Home from './routes/navi/N1_home.jsx'
import N2Search from './routes/navi/N2_search.jsx'
import N3Upload from './routes/navi/N3_upload.jsx'
import N4Recipe from './routes/navi/N4_recipe.jsx'
import N5Mypage from './routes/navi/N5_mypage.jsx'
import "tailwindcss/tailwind.css";
import Naver from './routes/login/Naver';
import Withdrawal from './routes/login/Withdrawal';
import FollowList from './components/mypage/FollowList';
import NotFound from './components/home/NotFound';
import Paper from '@mui/material/Paper';
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
    <Paper className="App">
      <div style={{ margin: '0 auto' }}>
      </div>
      <Routes>
      <Route path="/" element={isLogIn ? <Home/> : <Navigate to="/naver" />} />
        <Route path="/redirect" element={<Redirect  setIsLogIn={setIsLogIn}/>} />
        <Route path="/naver" element={<Naver/>} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/followlist/:userId?" element={<FollowList />}/>
        <Route path="/home/*" element={<Home />}>
          <Route path="n1" element={<N1Home />} />
          <Route path="n2" element={<N2Search />} />
          <Route path="n3" element={<N3Upload />} />
          <Route path="n4" element={<N4Recipe />} />
          <Route path="n5" element={<N5Mypage />} />
          <Route path="n5/:userId" element={<N5Mypage />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Paper>
  );
}

export default App;