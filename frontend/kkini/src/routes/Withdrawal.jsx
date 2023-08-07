import React from 'react';
import { useNavigate } from 'react-router-dom'
// 회원탈퇴
function Withdrawal() {

  const navigate = useNavigate();
  
  return (
    <div>
      withdrawal입니다아아아
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default Withdrawal;