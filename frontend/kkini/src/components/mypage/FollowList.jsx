import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function FollowList() {
    window.scrollTo(0, 0);
    
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    return (
      <div>
        <div>
          followlist
        </div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
          {data.map(item => (
                  <div key={item.id}>
                      {/* 객체의 속성에 따라서 내용을 표시하세요. */}
                      <img src={item.프로필이미지} alt="" />
                      <h2>{item.닉네임}</h2>
                      <hr />
                  </div>
          ))}
      </div>
    );
  }
  
  export default FollowList;