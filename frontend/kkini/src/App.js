import React from 'react';
import './App.css';

import { useState } from 'react';
import Login from './routes/Login.js';
import Home from './routes/Home.js';

import NaverLogin from './routes/NaverLogin.js';

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <div className="App">
      <NaverLogin></NaverLogin>


      {/* {!isLoggedIn
      ? <Login onLogin={handleLogin} />
      : <Home onLogout={handleLogout} />
      } */}
    </div>
  );
}

export default App;
