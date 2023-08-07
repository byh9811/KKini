import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Home from './Home.jsx';
import Login from './Login.jsx';

const Redirect = () => {
  const code = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log({code})
  useEffect(() => {
    if (code) { // code 값이 있다면
      // 쿠키나 세션 / 리덕스 툴킷에 코드 저장 로직
      setIsLoggedIn(true);
      navigate('/n1'); // 메인 페이지로 이동
    } else {
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [code, navigate]);

  return (
    <div>
      <h2>인증 코드 받는 중</h2>
    </div>
  );
};

export default Redirect;
