import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios';

function FollowList() {
    window.scrollTo(0, 0);
    
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useParams();

    // state에서 followlist 값을 가져옵니다.
    const followlist = location.state && location.state.followlist;


    useEffect(() => {

      console.log(userId);  // userId 값을 콘솔에 출력
      console.log(followlist);

      // followlistValue를 사용하여 API를 호출하거나 필요한 작업을 수행하세요.
      if(followlist === 0) {
          // follower에 관한 로직 수행
        axios
        .get(`/follow/followerList/${userId}`)
        .then((res) => {
          setData(res.data.response);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
      
      } else if(followlist === 1) {
          // following에 관한 로직 수행
      axios
        .get(`/follow/followList/${userId}`)
        .then((res) => {
          setData(res.data.response);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
      }
  }, [userId, followlist]);

    return (
      <div>
        <div>
          followlist
        </div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
          {data.map(item => (
                  <Link to = {`/n5/${item["회원 식별자"]}`} key={item.식별자}>
                      {/* 객체의 속성에 따라서 내용을 표시하세요. */}
                      <img src={item["프로필 이미지"]} alt="" />
                      <h2>{item.닉네임}</h2>
                      <hr />
                  </Link>
          ))}
      </div>
    );
  }
  
  export default FollowList;