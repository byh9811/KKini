import React from 'react';

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import Tab from './../components/Tab';
import U1 from './U1.js'
import U2 from './U2.js'

function Upload() {
  return (
    <div>
      <Tab></Tab>

      <Routes>
        <Route path="/upload1" element={<U1></U1>} />
        <Route path="/upload2" element={<U2></U2>} />
      </Routes>
    </div>
  );
}

export default Upload;
