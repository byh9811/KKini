import React, { useState, useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from "styled-components";

export const ProfileUserDetails = ({ 내것 = 0, memid = 0 }) => {
  const navigate = useNavigate();
  const [mine] = useState(내것);

  const [data, setData] = useState("");
  const [follow, setFollow] = useState("");
  const [follower, setFollower] = useState("");
  useEffect(() => {
    if (mine === 1) {
      // 마이페이지 정보 불러오기
      axios
        .get("http://localhost:8080/api/mypage/info")
        .then((res) => {
          setData(res.data.response);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
      // 팔로우 수
      axios
        .get("http://localhost:8080/api/mypage/countFollow")
        .then((res) => {
          setFollow(res.data.response);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
      // 팔로워 수
      axios
        .get("http://localhost:8080/api/mypage/countFollower")
        .then((res) => {
          setFollower(res.data.response);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });

        
        
    }
  }, []);

  //  팔로우
  // const { memberId } = useParams();
  // const [followingList, setFollowingList] = useState([]);
  // const [followerList, setFollowerList] = useState([]);
  // const [isFollowing, setIsFollowing] = useState(false);

  // useEffect(() => {
  //   fetchFollowingList();
  //   fetchFollowerList();
  // }, [memberId]);

  // const fetchFollowingList = async () => {
  //   axios
  //     .get(`/api/follow/follow/${memberId}`)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   if (response.data.success) {
  //     setFollowingList(response.data.response);
  //     setIsFollowing(response.data.response.some((user) => user["회원 식별자"] === Number(memberId)));
  //   } else {
  //     console.error(response.data.error.message);
  //   }
  // };

  // const fetchFollowerList = async () => {
  //   const response = await axios.get(`/api/follow/follower/${memberId}`);
  //   if (response.data.success) {
  //     setFollowerList(response.data.response);
  //   } else {
  //     console.error(response.data.error.message);
  //   }
  // };

  // const handleFollow = async () => {
  //   const response = await axios.post(`/api/follow/${memberId}`);
  //   if (response.data.success) {
  //     fetchFollowingList();
  //     fetchFollowerList();
  //   } else {
  //     console.error(response.data.error.message);
  //   }
  // };

  // const handleUnfollow = async () => {
  //   const response = await axios.delete(`/api/follow/${memberId}`);
  //   if (response.data.success) {
  //     fetchFollowingList();
  //     fetchFollowerList();
  //   } else {
  //     console.error(response.data.error.message);
  //   }
  // };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleSave = () => {
    handleClose();
  };

  return (
    <div>
      <div className="py-10 w-full">
        <div className="flex items-center">
          <div className="w-[15%]">
            <img className="w-32 h-32 rounded-full" src={data.image} alt="" />
          </div>

          <div className="space-y-5 text-xs">
            <div className="flex space-x-10 items-center">
              <p className="font-semibold">{data.nickname}</p>
              <button>follow</button>
              <CiSettings size={20} onClick={handleShow}></CiSettings>
            </div>
            <div className="flex space-x-10">
              <div>
                <Link to = "/followlist">
                <span className="font-semibold mr-2">{follow}</span>
                  follower
                </Link>
              </div>
              <div>
                <Link to = "/followlist">
                <span className="font-semibold mr-2">{follower}</span>
                  following
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 팔로우 */}
      {/* <div className="follow">
          <button onClick={isFollowing ? handleUnfollow : handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button> */}

      {/* 리스트들은 어케 보여줄지 수정*/}
      {/* <h2>Following List</h2>
          {followingList.map(user => <p key={user['식별자']}>{user['닉네임']}</p>)}
          <h2>Follower List</h2>
          {followerList.map(user => <p key={user['식별자']}>{user['닉네임']}</p>)} */}
      {/* </div>         */}
        
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ textAlign: 'center' }}>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>
                <CommentsContainer>
                  <div>
                    <Link to = "/withdrawal">
                      회원탈퇴
                    </Link>
                  </div>
                  <a href="http://localhost:8080/api/member/logout">
                    로그아웃
                  </a>
                </CommentsContainer>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>닫기</Button>
                    <Button variant="primary" onClick={handleSave}>금액 평가 완료</Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
};

// const FollowButton = ({ isFollowing, onFollow }) => {
//   return (
//     <button onClick={onFollow}>
//       {isFollowing ? 'Unfollow' : 'Follow'}
//     </button>
//   );
// };

const CommentsContainer = styled.div`
  max-width: 550px;
  margin: 30px auto;
  padding: 10px;
`;
