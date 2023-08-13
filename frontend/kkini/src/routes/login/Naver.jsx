// Naver.js
import React from "react";
import styled, { css } from 'styled-components';

const Naver = () => {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_API_KEY;
  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL; // 콜백 URL 수정
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&STATE=${STATE}&redirect_uri=${NAVER_CALLBACK_URL}`;

  const NaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorize/naver?redirect_uri=http://localhost:3000/redirect";
  };

  return (
    <div style={{ margin: '0 auto' }}>
      <div style={{ margin: '0 auto' }}>
        <Logo src="img/logo.png" alt="로고" className="mx-auto"/>
        <Title style={{ margin: '0 auto' }}>끼니에 어서오세요!</Title>
      </div>
            <NaverLoginBtn2 onClick={NaverLogin} className="mx-auto">
                <NaverIcon alt="navericon" />
                <BtnTitle>네이버 로그인</BtnTitle>
            </NaverLoginBtn2>
    </div>
  )
  // <button onClick={NaverLogin}>네이버 로그인</button>;
};

export default Naver;

const NaverLoginBtn = styled.button`
    display: flex;
    align-items: center;
    width: 327px;
    height: 56px;
    background-color: #03c75a;
    border-radius: 6px;
    margin-top: 50px;
`

const NaverLoginBtn2 = styled.button`
    display: flex;
    align-items: center;
    width: 327px;
    height: 56px;
    background-color: white;
    border-radius: 6px;
    margin-top: 50px;
    border: 1px solid slategray;
`

// 로그인 버튼 사용가이드 링크를 들어가면 이미지를 받아 이렇게 적용이 가능하다 ! 
const NaverIcon = styled.div`
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background: url('img/btnw.png') no-repeat center;
    background-size: 30px;
`

const Title = styled.span`
    margin-left: 90px;
    color: slategrey;
    font-weight: 900;
    font-size: 25px;
    line-height: 24px;
    `

const BtnTitle = styled.span`
    margin-left: 90px;
    color: slategray;
    font-weight: 800;
    font-size: 14px;
    line-height: 24px;
    `

const Logo = styled.img`
margin-top: 100px;
margin-bottom: 50px;
width: 250px;
height: 250px;
`
