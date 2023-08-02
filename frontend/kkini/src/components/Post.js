import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';

function Post({ user, postImage, likes, timestamp }) {
  return (
    <PostContainer>
      <PostHeader>
        <PostHeaderAuthor>
          <Avatar></Avatar>
          {user} • <span>{timestamp}</span>
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
          </PostIcon>
          <PostIcon>
            <ThumbDownOffAltRoundedIcon />
          </PostIcon>
          <PostIcon>
            <ChatBubbleOutlineRoundedIcon />
          </PostIcon>
        </div>
        <div className='post__iconSave'>
          <PostIcon>
            <LocalAtmRoundedIcon />
          </PostIcon>
          <PostIcon>
            <BookmarkBorderRoundedIcon />
          </PostIcon>
        </div>
      </PostFooterIcons>

      <div>{likes}명이 좋아합니다.</div>
    </PostContainer>
  );
}

export default Post;

const PostContainer = styled.div`
  width: 550px;
  margin: 30px 40px 50px 40px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const PostHeaderAuthor = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bolder;

  > span {
    color: gray;
    font-size: 15px;
    margin-left: 10px;
  }
`;

const PostImage = styled.div`
  img {
    width: 100%;
    border-radius: 6px;
    border: 0.6px solid rgba(128, 128, 128, 0.516);
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
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;