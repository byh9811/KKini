import React from 'react';
import { useNavigate } from 'react-router-dom';
// 스크랩
function Scrap() {

  const navigate = useNavigate();

  return (
    <div>
      스크랩입니다아아아
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default Scrap;