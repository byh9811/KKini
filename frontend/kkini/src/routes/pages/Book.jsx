import React from 'react';
import { useNavigate } from 'react-router-dom'
// 도감
function Book() {

  const navigate = useNavigate();
  
  return (
    <div>
      도감
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default Book;