import React, { useRef, useEffect } from 'react';
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

const Drawer = ({ isOpen, onClose }) => {
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

  return (
    <DrawerContainer ref={ref} isOpen={isOpen}>
      <button onClick={onClose}>닫기</button>
      <CommentsPage />
    </DrawerContainer>
  );
};

export default Drawer;