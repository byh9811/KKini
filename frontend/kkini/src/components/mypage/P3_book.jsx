import React from 'react';
import { useNavigate } from 'react-router-dom'

function P3_book() {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  return (
    <div>
        <img onClick={() => {navigate('/book')}} src="/img/도감버튼.png" alt="" />
    </div>
  );
}

export default P3_book;
