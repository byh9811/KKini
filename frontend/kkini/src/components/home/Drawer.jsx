import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CommentsPage from './CommentPage';


const DrawerContainer = styled.div`
  position: fixed;
  bottom: ${({ isOpen }) => (isOpen ? '0' : '-30%')};
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 30%;
  overflow-y: auto; // 세로 스크롤을 자동으로 활성화
  transition: bottom 0.3s;
  background-color: #F5F5F5;
  z-index: 1000;
  opacity: 0.8;  //투명도
  border-radius: 10px;
`;

const Drawer = ({ isOpen, onClose, postId, comments }) => {
  const ref = useRef();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const fetchComments = async () => {
    if (!postId) return;
    try {
      console.log(postId)
      console.log("여기1")
      console.log("여기1")
      console.log("여기1")
      console.log(postId)
      const response = await axios.get(`/comment/${postId}`);
      console.log(response);
      // if (response.data.success) {
      //     console.log(response.data)
      //   setComments(response.data.comments); // 예상 응답 구조에 따라 수정 필요
      // }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  console.log(comments)
  return (
    <DrawerContainer isOpen={isOpen} ref={ref}>
      <button onClick={onClose}>닫기</button>
      <CommentsPage 
  postId={postId} 
  comments={comments}
  onCommentsChange={fetchComments} // 이 부분이 정확한지 확인
/>
    </DrawerContainer>
  );
};

export default Drawer;
