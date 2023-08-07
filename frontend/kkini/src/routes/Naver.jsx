// Naver.js
import React from "react";
import styled, { css } from 'styled-components';

const Naver = () => {
  const NAVER_CLIENT_ID = "cuR5W3G8URwVF2atwAse";
  const NAVER_CALLBACK_URL = "http://localhost:8080/oauth2/callback/naver"; // 콜백 URL 수정
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&STATE=${STATE}&redirect_uri=${NAVER_CALLBACK_URL}`;

  const NaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorize/naver?redirect_uri=http://localhost:3000/redirect";
  };

  return (
    <>
            <NaverLoginBtn onClick={NaverLogin}>
                <NaverIcon alt="navericon" />
                <NaverLoginTitle>네이버로 로그인</NaverLoginTitle>
            </NaverLoginBtn>

         {/* // 구현할 위치에 아래와 같이 코드를 입력해주어야 한다. 
         // 태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다!
            <div id="naverIdLogin" /> </div> */}
        </>

  )
  // <button onClick={NaverLogin}>네이버 로그인</button>;
  
};

export default Naver;

const NaverLoginBtn = styled.button`
    display: flex;
    align-items: center;
    width: 360px;
    height: 56px;
    background-color: #03c75a;
    border-radius: 6px;
    margin: 0 auto;
`

// 로그인 버튼 사용가이드 링크를 들어가면 이미지를 받아 이렇게 적용이 가능하다 ! 
const NaverIcon = styled.div`
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background: url('/images/Login/navericon.png') no-repeat center;
    background-size: 30px;
`

const NaverLoginTitle = styled.span`
    margin-left: 90px;
    color: ${({ theme }) => theme.White};
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    `