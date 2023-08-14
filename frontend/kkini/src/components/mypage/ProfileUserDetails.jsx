import React, { useState, useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import FollowModal from "./FollowModal";

export const ProfileUserDetails = ({ 내것 = 0, memid = "" }) => {
  const [data, setData] = useState("");
  const [follow, setFollow] = useState("");
  const [follower, setFollower] = useState("");
  const [isfollowing, setIsfollowing] = useState();

  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    console.log(memid, "userdetail");
    // 마이페이지 정보 불러오기
    axios
      .get(`/mypage/info/${memid}`)
      .then((res) => {
        setData(res.data.response);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    // 팔로우 수
    axios
      .get(`/follow/countFollow/${memid}`)
      .then((res) => {
        setFollow(res.data.response);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    // 팔로워 수
    axios
      .get(`/follow/countFollower/${memid}`)
      .then((res) => {
        setFollower(res.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`/follow/followList/${memid}`, {
        params: {
          page: 0,
        },
      })
      .then((res) => {
        setFollowerList(res.data.response.content);
        setIsfollowing(res.data.response.content.some((user) => user["회원 식별자"] === Number(memid)));
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`/follow/followerList/${memid}`, {
        params: {
          page: 0,
        },
      })
      .then((res) => {
        setFollowerList(res.data.response.content);
        setIsfollowing(res.data.response.content.some((user) => user["회원 식별자"] === Number(memid)));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  팔로우
  const handleFollow = () => {
    axios
      .post(`/follow/${memid}`)
      .then((res) => {
        setIsfollowing(true);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`/follow/followerList/${memid}`, {
        params: {
          page: 0,
        },
      })
      .then((res) => {
        // setIsfollowing(res.data.response.some((user) => user["회원 식별자"] === Number(memid)));
        setIsfollowing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="py-10 w-full">
        <div className="flex items-center">
          <div className="w-[15%]">
            <img className="w-32 h-32 rounded-full" src={data.image} alt="프로필 이미지" />
          </div>

          <div className="space-y-5 text-xs">
            <div className="flex space-x-10 items-center">
              <p className="font-semibold">{data.nickname}</p>
              {/* 팔로우 */}
              {
                // 내것 ? null :
                // <button onClick={isfollowing ? handleUnfollow : handleFollow}>
                //   {isfollowing ? 'Unfollow' : 'Follow'}
                // </button>
              }

              <CiSettings size={20} onClick={handleShow}></CiSettings>
            </div>
            <div className="flex space-x-10">
              <FollowModal whichOne="follow" />
              <p>{follow}</p>
              <FollowModal whichOne="follower"></FollowModal>
              <p>{follower}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ textAlign: "center" }}>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <CommentsContainer>
            <div>
              <Link to="/withdrawal">회원탈퇴</Link>
            </div>
            <a href="http://localhost:8080/api/member/logout">로그아웃</a>
          </CommentsContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const CommentsContainer = styled.div`
  max-width: 550px;
  margin: 30px auto;
  padding: 10px;
`;
