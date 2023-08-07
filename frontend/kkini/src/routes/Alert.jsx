import React from 'react';
import { useNavigate } from 'react-router-dom';
// 알림
function Alert() {

  const navigate = useNavigate();

  return (
    <div>
      알림입니다아아아
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default Alert;