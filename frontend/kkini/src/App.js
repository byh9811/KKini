import React, { useState } from 'react';
import './App.css';

import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import NaverLogin from './routes/NaverLogin.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <NaverLogin></NaverLogin>
      {
       !isLoggedIn
       ? <Login onLogin={handleLogin} />
       : <Home onLogout={handleLogout} />
      }
    </div>
  );
}

export default App;

