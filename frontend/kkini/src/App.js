// import React, { useState } from 'react';
// import './App.css';

// import Home from './routes/Home.js';
// import NaverLogin from './routes/NaverLogin.js';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   const handleLogin = (token) => {
//     setToken(token);
//     localStorage.setItem('token', token);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <div>
//       {token
//       ? <Home onLogout={handleLogout} />
//       // : <NaverLogin onLogin={handleLogin} />
//       : <NaverLogin></NaverLogin>
//       }
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';

import { useState } from 'react';
import Login from './routes/Login.jsx';
import Home from './routes/Home.jsx';

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
      {!isLoggedIn
      ? <Login onLogin={handleLogin} />
      : <Home onLogout={handleLogout} />
      }
    </div>
  );
}

export default App;

