import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.jsx';
import N1 from './N1.jsx'
import N2 from './N2.jsx'
import N3 from './N3.jsx'
import N4 from './N4.jsx'
import N5 from './N5.jsx'
import CommentsPage from '../components/CommentPage.jsx'
import Scrap from '../routes/Scrap.jsx';
import Alert from '../routes/Alert.jsx';
import Withdrawal from '../routes/Withdrawal.jsx';
import Logout from '../routes/Logout.jsx';
import Book from '../routes/Book.jsx';

function Home({ onLogout }) {
  const handleLogout = () => { 
    onLogout();
  };

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/n1');
  }, []);

  return (
    <div style={{ margin: '0 auto' }}>
      <br />
      {/* <button onClick={handleLogout}>로그아웃</button> */}
      <Routes>
        <Route path="/n1" element={<N1 />} />
        <Route path="/n2" element={<N2 />} />
        <Route path="/n3" element={<N3 />} />
        <Route path="/n4" element={<N4 />} />
        <Route path="/n5" element={<N5 />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="scrap" element={<Scrap />} />
        <Route path="alert" element={<Alert />} />
        <Route path="withdrawal" element={<Withdrawal />} />
        <Route path="book" element={<Book />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
      
      <NavigationBar></NavigationBar>
    </div>
  );
}

export default Home;
