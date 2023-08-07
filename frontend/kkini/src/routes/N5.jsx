import React,{ useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Drawer2 from '../components/Drawer2';
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai';

import axios from 'axios';
import { useParams } from 'react-router-dom';

//MY PAGE
function N5() {
  window.scrollTo(0, 0);

  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);  // 설정 드로워

  // 더미 데이터
  const users = [
    { id: 1, name: 'User1' },
    { id: 2, name: 'User2' },
    // ...
  ];

  //  팔로우
  const { memberId } = useParams();
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchFollowingList();
    fetchFollowerList();
  }, [memberId]);

  const fetchFollowingList = async () => {
    const response = await axios.get(`/api/follow/follow/${memberId}`);
    if (response.data.success) {
      setFollowingList(response.data.response);
      setIsFollowing(response.data.response.some(user => user['회원 식별자'] === Number(memberId)));
    } else {
      console.error(response.data.error.message);
    }
  };

  const fetchFollowerList = async () => {
    const response = await axios.get(`/api/follow/follower/${memberId}`);
    if (response.data.success) {
      setFollowerList(response.data.response);
    } else {
      console.error(response.data.error.message);
    }
  };

  const handleFollow = async () => {
    const response = await axios.post(`/api/follow/${memberId}`);
    if (response.data.success) {
      fetchFollowingList();
      fetchFollowerList();
    } else {
      console.error(response.data.error.message);
    }
  };

  const handleUnfollow = async () => {
    const response = await axios.delete(`/api/follow/${memberId}`);
    if (response.data.success) {
      fetchFollowingList();
      fetchFollowerList();
    } else {
      console.error(response.data.error.message);
    }
  };

  return (
    <div>
      <Drawer2 isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        <button onClick={() => setIsDrawerOpen(true)}>설정</button>
        <button onClick={() => {navigate('/book')}}>도감</button>

        {/* 팔로우 */}
        <div className="follow">
          <h1>Profile Page of Member {memberId}</h1>
          <button onClick={isFollowing ? handleUnfollow : handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
          
          {/* 리스트들은 어케 보여줄지 수정*/}
          <h2>Following List</h2>
          {followingList.map(user => <p key={user['식별자']}>{user['닉네임']}</p>)}
          <h2>Follower List</h2>
          {followerList.map(user => <p key={user['식별자']}>{user['닉네임']}</p>)}
        </div>

        {/* 포스트들 */}
        <div>사진 55 <button onClick={() => navigate('/myFeed')}>전체보기</button></div>
        <AppContainer>
          <Grid>
            <Image src="img/도감버튼.png" alt="image 1"/>
            <Image src="img/도감버튼.png" alt="image 2"/>
            <Image src="img/도감버튼.png" alt="image 3"/>
            <Overlay onClick={() => navigate('/otherFeed')}>
              <Image src="img/도감버튼.png" alt="image 4"/>
              <IconContainer>
                <AiOutlinePlus size={100} color={'#ffffff'}/>
              </IconContainer>
            </Overlay>
          </Grid>
        </AppContainer>

        <div>레시피 55 <button onClick={() => navigate('/myFeed')}>전체보기</button></div>
        <AppContainer>
          <Grid>
            <Image src="img/도감버튼.png" alt="image 1"/>
            <Image src="img/도감버튼.png" alt="image 2"/>
            <Image src="img/도감버튼.png" alt="image 3"/>
            <Overlay onClick={() => navigate('/myFeed')}>
              <Image src="img/도감버튼.png" alt="image 4"/>
              <IconContainer>
                <AiOutlinePlus size={100} color={'#ffffff'}/>
              </IconContainer>
            </Overlay>
          </Grid>
        </AppContainer>
        
    </div>

  );
}

const FollowButton = ({ isFollowing, onFollow }) => {
  return (
    <button onClick={onFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default N5;

const Container = styled.div`
  // width: 550px;
  margin: 30px 40px 50px 40px;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  cursor: pointer;
  border-radius: 15px;
`;

const Overlay = styled.div`
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;