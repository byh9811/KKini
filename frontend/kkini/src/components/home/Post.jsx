import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Button from "react-bootstrap/Button";
import Drawer from "./Drawer";
import axios from "axios";
import ImageSwiper from "./ImageSwiper";

const Post = forwardRef(
  ({ user, postImage, createDateTime, likeCnt, disLikeCnt, commentCnt, contents, avgPrice, myPrice, reaction, recipeName, postId, isScrap }, ref) => {
    const [reactionState, setReaction] = useState(reaction);
    const [likeCntState, setLikeCnt] = useState(likeCnt);
    const [disLikeCntState, setDisLikeCnt] = useState(disLikeCnt);
    const [commentCntState, setCommentCnt] = useState(commentCnt);
    const [isScrapState, setIsScrap] = useState(isScrap);
    const [avgPriceState, setAvgPrice] = useState(avgPrice);
    const [myPriceState, setMyPrice] = useState(myPrice);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [comments, setComments] = useState([]);

    const changeScrap = (postId) => {
      if (isScrapState) {
        axios
          .delete(`/scrap/${postId}`)
          .then((response) => {
            if (response.data.success) {
              if (isScrapState) {
                setIsScrap(false);
              } else {
                setIsScrap(true);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post(`/scrap/${postId}`)
          .then((response) => {
            if (response.data.success) {
              if (isScrapState) {
                setIsScrap(false);
              } else {
                setIsScrap(true);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const handleIconClick = (type) => {
      axios
        .post(`/reaction`, {
          postId: postId,
          state: type,
        })
        .then((response) => {
          setReaction(response.data.response);

          if (response.data.success) {
            if (reactionState === true) {
              setLikeCnt((cnt) => cnt - 1);
              if (type === false) {
                setDisLikeCnt((cnt) => cnt + 1);
              }
            } else if (reactionState === false) {
              setDisLikeCnt((cnt) => cnt - 1);
              if (type === true) {
                setLikeCnt((cnt) => cnt + 1);
              }
            } else if (reactionState === null) {
              if (type === true) {
                setLikeCnt((cnt) => cnt + 1);
              } else if (type === false) {
                setDisLikeCnt((cnt) => cnt + 1);
              }
            }
          } else {
            console.error("Error from server:", response.data.error.message);
          }
        })
        .catch((error) => {
          console.error("There was an error sending the PUT request:", error);
        });
    };

    return (
      <PostContainer ref={ref}>
        <Drawer
          isOpen={isDrawerOpen}
          postId={postId}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          comments={comments}
        />
        <PostHeader>
          <PostHeaderAuthor>
            <Avatar className="m-2" />
            <div className="userInfo">
              <div>{user}</div>
              <span>{createDateTime}</span>
            </div>
          </PostHeaderAuthor>
        </PostHeader>
        <Contentstext>
          {contents}
          <b> #{recipeName}</b>
        </Contentstext>
        <div style={{ width: "20vw", height: "20vh" }}>
          <ImageSwiper postImage={postImage} />
        </div>

        <PostFooterIcons>
          <div className="post__iconsMain">
            <PostIcon>
              <FavoriteBorderIcon style={{ color: reactionState === true ? "red" : "gray" }} onClick={() => handleIconClick(true)} />
            </PostIcon>
            <PostIcon>
              <ThumbDownOffAltRoundedIcon style={{ color: reactionState === false ? "blue" : "gray" }} onClick={() => handleIconClick(false)} />
            </PostIcon>
            <PostIcon>
              <ChatBubbleOutlineRoundedIcon
                onClick={() => {
                  setIsDrawerOpen(true);

                  axios
                    .get(`/comment/${postId}`)
                    .then((res) => setComments(res.data.response))
                    .catch((err) => console.log("err:", err));
                }}
              />
            </PostIcon>
            <div>
              <CountText>
                <b>{likeCntState}</b>좋아요 <b>{disLikeCntState}</b>싫어요 <b>{commentCntState}</b>
                개의 댓글
              </CountText>
            </div>
          </div>
          <div className="post__iconSave">
            <PostIcon>
              <LocalAtmRoundedIcon />
              <div>
                <CountText>{avgPrice}</CountText>
              </div>
            </PostIcon>
            <PostIcon>
              {isScrapState ? (
                <BookmarkIcon onClick={() => changeScrap(postId)} />
              ) : (
                <BookmarkBorderRoundedIcon onClick={() => changeScrap(postId)} />
              )}
            </PostIcon>
          </div>
        </PostFooterIcons>
      </PostContainer>
    );
  }
);

export default Post;

const PostContainer = styled.div`
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

const CountText = styled.span`
  display: flex;
  font-size: 10px;
`;

const Contentstext = styled.span`
  display: flex;
  font-size: 15px;
`;

const Recipetext = styled.span`
  display: flex;
  font-size: 15px;
  color: #4545b1;
`;
