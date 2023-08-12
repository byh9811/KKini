import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { changeToken } from "../../store.js";
import { useDispatch, useSelector } from "react-redux";
import setAuthorizationToken from "../../apis/utils/setAuthorizationToken.js";

const Redirect = ({ setIsLogIn }) => {
  let state = useSelector((state)=>(state))
  let dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    
    if (token) { // code 값이 있다면
      // 쿠키나 세션 / 리덕스 툴킷에 코드 저장 로직
      setIsLogIn(true);
      dispatch(changeToken(token));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      navigate('/home'); // 메인 페이지로 이동
    } else {
      navigate('/naver'); // 로그인 페이지로 이동
    }
  }, [token]);

  return (
    <div>
      <h2>인증 코드 받는 중</h2>
    </div>
  );
};

export default Redirect;
