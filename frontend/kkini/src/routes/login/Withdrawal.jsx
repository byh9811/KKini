import React from 'react';
import { useNavigate } from 'react-router-dom'
// 회원탈퇴
function Withdrawal() {

  const navigate = useNavigate();
  
  return (
    <div className='mx-auto'>
      <div>
        돌이킬 수 없는 선택이오.
      </div>
      <div>
        두 번 묻지 않을테요.
      </div>
      <div>
        회원탈퇴 하시겠오?
      </div>
      <button onClick={() => navigate(-1)}>확인</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default Withdrawal;