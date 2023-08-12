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

const Drawer = ({ isOpen, onClose, postId }) => {
  const ref = useRef();
  console.log(postId)
  const [comments, setComments] = useState([]);

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
      const response = await axios.get(`http://localhost:8080/api/comments?postId=${postId}`);
      if (response.data.success) {
        setComments(response.data.comments); // 예상 응답 구조에 따라 수정 필요
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Drawer가 열리거나 postId가 변경되었을 때 댓글을 조회합니다.
  useEffect(() => {
    fetchComments();
  }, [isOpen, postId]);

  return (
    <DrawerContainer isOpen={isOpen} ref={ref}>
      <button onClick={onClose}>닫기</button>
      <CommentsPage postId={postId} /> {/* postId를 CommentsPage로 전달 */}
    </DrawerContainer>
  );
};

export default Drawer;
