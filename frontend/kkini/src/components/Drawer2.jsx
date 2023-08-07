import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import SettingBar from './SettingBar.jsx';

const Drawer2 = ({ isOpen, onClose }) => {
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
    <DrawerContainer isOpen={isOpen} ref={ref}>
      {/* <button onClick={onClose}>닫기</button> */}
      <SettingBar />
    </DrawerContainer>
  );
};

export default Drawer2;

const DrawerContainer = styled.div`
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '0' : '-50%')};  // 오른쪽에서 나옴
  top: 0;
  width: 50%;
  height: 100%;
  transition: right 0.3s; // 오른쪽 이동효과
  background-color: #F5F5F5;
  z-index: 1000;
`;
