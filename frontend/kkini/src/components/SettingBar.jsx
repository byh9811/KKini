import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function SettingBar() {

  const navigate = useNavigate();

  return (
    <div>
      <CommentsContainer>
      <h2>Settings</h2>
      <hr />
      <div onClick={() => {navigate('/withdrawal')}}>회원탈퇴</div>
      <div onClick={() => {navigate('/logout')}}>로그아웃</div>
      
    </CommentsContainer>
    </div>
    
  );
}


export default SettingBar;

const CommentsContainer = styled.div`
  max-width: 550px;
  margin: 30px auto;
  padding: 10px;
`;