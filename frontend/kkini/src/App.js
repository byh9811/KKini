import './App.css'
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/Home.jsx';
import Redirect from './routes/Redirect.jsx';
import N1 from './routes/N1.jsx'
import N2 from './routes/N2.jsx'
import N3 from './routes/N3.jsx'
import N4 from './routes/N4.jsx'
import N5 from './routes/N5.jsx'
import "tailwindcss/tailwind.css";
import Naver from './routes/Naver';

// App.js
function App() {
  const [isLogIn, setIsLogIn ] = useState(false);
  console.log(isLogIn)
  return (
    <div className="App">
      <div style={{ margin: '0 auto' }}>
      </div>
      <Routes>
      <Route path="/" element={isLogIn ? <Home/> : <Navigate to="/naver" />} />
        <Route path="/redirect" element={<Redirect  setIsLogIn={setIsLogIn}/>} />
        <Route path="/naver" element={<Naver/>} />
        <Route path="/home" element={<Home />}>
          <Route path="n1" element={<N1 />} />
          <Route path="n2" element={<N2 />} />
          <Route path="n3" element={<N3 />} />
          <Route path="n4" element={<N4 />} />
          <Route path="n5" element={<N5 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;