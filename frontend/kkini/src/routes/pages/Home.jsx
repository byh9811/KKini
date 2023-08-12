import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../../components/home/NavigationBar.jsx';
import N1 from '../navi/N1_home.jsx'
import N2 from '../navi/N2_search.jsx'
import N3 from '../navi/N3_upload.jsx'
import N4 from '../navi/N4_recipe.jsx'
import N5 from '../navi/N5_mypage.jsx'
import CommentsPage from '../../components/home/CommentPage.jsx'
import Book from './Book.jsx';
import FollowList from '../../components/mypage/FollowList.jsx'

function Home({ onLogout }) {

  //persisted state
  const handleLogout = () => { 
    onLogout();
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('/home/n')) {
      navigate('/home/n1');
    }
  }, [location, navigate]);

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
        <Route path="book" element={<Book />} />
        <Route path="followlist" element={<FollowList />} />
      </Routes>
      
      <NavigationBar></NavigationBar>
    </div>
  );
}

export default Home;
