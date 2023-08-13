import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../../components/home/NavigationBar.jsx';
import N1_home from '../navi/N1_home.jsx'
import N2_search from '../navi/N2_search.jsx'
import N3_upload from '../navi/N3_upload.jsx'
import N4_recipe from '../navi/N4_recipe.jsx'
import N5_mypage from '../navi/N5_mypage.jsx'
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
        <Route path="/n1" element={<N1_home />} />
        <Route path="/n2" element={<N2_search />} />
        <Route path="/n3" element={<N3_upload />} />
        <Route path="/n4" element={<N4_recipe />} />
        <Route path="/n5" element={<N5_mypage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="book" element={<Book />} />
        <Route path="followlist" element={<FollowList />} />
      </Routes>
      
      <NavigationBar></NavigationBar>
    </div>
  );
}

export default Home;
