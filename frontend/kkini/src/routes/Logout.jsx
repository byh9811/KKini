import React from 'react';
import { useNavigate } from 'react-router-dom';
// 로그아웃
function Logout() {

  const navigate = useNavigate();
  
  return (
    <div>
      로그아웃하시겠소?
      <button onClick={()=> sessionStorage.clear()}>확인</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default Logout;