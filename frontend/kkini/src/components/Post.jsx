import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Drawer from './Drawer'; // Drawer 컴포넌트를 가져옵니다

const Post = forwardRef(({ user, postImage, likes, timestamp }, ref) => {
  
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState('');
  const [amounts, setAmounts] = useState([]);
  const [averageAmount, setAverageAmount] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAmount('');
  };
  const handleShow = () => setShow(true);

  const handleSave = () => {
    const newAmounts = [...amounts, parseFloat(amount)];
    setAmounts(newAmounts);

    const totalAmount = newAmounts.reduce((a, b) => a + b, 0);
    const avgAmount = (totalAmount / newAmounts.length).toFixed(0);
    setAverageAmount(avgAmount);

    handleClose();
  };

  
  return (
    <PostContainer ref={ref}>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      
      <PostHeader>
        <PostHeaderAuthor>
          <Avatar className='m-2'></Avatar>
          <div className="userInfo">
            <div>{user}</div>
            <span>{timestamp}</span>
          </div>
        </PostHeaderAuthor>
      </PostHeader>

      <PostImage>
        <img src={postImage} alt="" />
      </PostImage>

      <PostFooter></PostFooter>
      <PostFooterIcons>
        <div className='post__iconsMain'>
          <PostIcon>
            <FavoriteBorderIcon />
            {likes}
          </PostIcon>
          <PostIcon>
            <ThumbDownOffAltRoundedIcon />
          </PostIcon>
          <PostIcon>
            <ChatBubbleOutlineRoundedIcon onClick={() => setIsDrawerOpen(true)} />
          </PostIcon>
        </div>
        <div className='post__iconSave'>
          <PostIcon onClick={handleShow}>
            <LocalAtmRoundedIcon />
          </PostIcon>
          <PostIcon>
            <BookmarkBorderRoundedIcon />
          </PostIcon>
        </div>
      </PostFooterIcons>

      <div>{likes}명이 좋아합니다.</div>
      {averageAmount && <div>평가된 금액의 평균: {averageAmount}원</div>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ textAlign: 'center' }}>
          <Modal.Title>금액 평가창</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          이 음식이 얼마처럼 보이나요???
          <img src={postImage} alt="" style={{ maxWidth: '100%', borderRadius: '6px' }} />
          <div>
            <input
              type="number"
              value={amount}
              placeholder="금액을 입력하세요"
              onChange={(e) => setAmount(e.target.value)}
              style={{ textAlign: 'center', width: '100%', padding: '10px', margin: '10px 0' }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSave}>
            금액 평가 완료
          </Button>
        </Modal.Footer>
      </Modal>

    </PostContainer>
  );
});

export default Post;

const PostContainer = styled.div`
  // width: 550px;
  margin: 0px 40px 50px 40px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const PostHeaderAuthor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bolder;

  > .userInfo {
    margin-left: 5px;
    
    > div {
      color: black;
      font-size: 13px;
      margin: 0;
    }

    > span {
      color: gray;
      font-size: 10px;
      margin: 0;
    }
  }
`;


const PostImage = styled.div`
  img {
    width: 95%;
    border-radius: 6px;
    border: 0.6px solid rgba(128, 128, 128, 0.516);
    margin: 0 auto;
  }
`;

const PostFooter = styled.div``;

const PostFooterIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PostIcon = styled.div`
  display: inline-block; 
  padding: 7px;
  font-size: 30px;
  margin: 0px 10px auto;

  &:hover {
    cursor: pointer;
  }
`;