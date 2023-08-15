import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Modal, Button } from "react-bootstrap";
import Drawer from "./Drawer";
import axios from "axios";
import ImageSwiper from "./ImageSwiper";

const Post = forwardRef(
  ({ user, postImage, createDateTime, likeCnt, disLikeCnt, commentCnt, contents, avgPrice, myPrice, reaction, recipeName, postId, isScrap }, ref) => {
    const [show, setShow] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [reactionState, setReaction] = useState(reaction);
    const [likeCntState, setLikeCnt] = useState(likeCnt);
    const [disLikeCntState, setDisLikeCnt] = useState(disLikeCnt);
    const [commentCntState, setCommentCnt] = useState(commentCnt);
    const [isScrapState, setIsScrap] = useState(isScrap);
    const [avgPriceState, setAvgPrice] = useState(avgPrice);
    const [myPriceState, setMyPrice] = useState(myPrice);
    const [priceModalShow, setPriceModalShow] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [day, setDay] = useState("");

    useEffect(() => {
      let today = new Date();
      let createDate = new Date(createDateTime);
      let milliseconds = today - createDate;
      let now = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
      if (now === 0) {
        setDay("오늘");
      } else {
        setDay(`${now}일전`);
      }
    }, "");

    // 모달
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const changeScrap = (postId) => {
      const scrapAction = isScrapState ? axios.delete : axios.post;

      scrapAction(`/scrap/${postId}`)
        .then((response) => {
          if (response.data.success) {
            setIsScrap(!isScrapState);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
            const cntUpdater = (prevCnt) => (type ? prevCnt + 1 : prevCnt - 1);

            setLikeCnt(cntUpdater(likeCntState));
            setDisLikeCnt(cntUpdater(disLikeCntState));
          } else {
            console.error("Error from server:", response.data.error.message);
          }
        })
        .catch((error) => {
          console.error("There was an error sending the PUT request:", error);
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
      axios
        .post(`/evaluation`, {
          postId: postId,
          price: myPriceState,
        })
        .then((response) => {
          setAvgPrice(response.data.response);
        })
        .catch((error) => {
          console.log("error: ", error);
        });

      handleClose();
    };

    return (
      <PostContainer ref={ref}>
        <Drawer
          isOpen={isDrawerOpen}
          postId={postId}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        />
        <PostHeader>
          <PostHeaderAuthor>
            <Avatar className="m-2" />
            <div className="userInfo">
              <div>{user}</div>
              <span>{day}</span>
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
            {/* 좋아요 인터페이스 */}
            <PostIcon>
              <FavoriteBorderIcon style={{ color: reactionState === true ? "red" : "gray" }} onClick={() => handleIconClick(true)} />
            </PostIcon>

            {/* 싫어요 인터페이스 */}
            <PostIcon>
              <ThumbDownOffAltRoundedIcon style={{ color: reactionState === false ? "blue" : "gray" }} onClick={() => handleIconClick(false)} />
            </PostIcon>

            {/* 댓글 인터페이스 : 댓글 열기 */}
            <PostIcon>
              <ChatBubbleOutlineRoundedIcon
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
              />
            </PostIcon>

            {/* 포스트 상태 표시 */}
            <div>
              <CountText>
                <b>{likeCntState}</b>좋아요 <b>{disLikeCntState}</b>싫어요 <b>{commentCntState}</b>
                개의 댓글
              </CountText>
            </div>
          </div>

          <div className="post__iconSave">
            {/* 금액 인터페이스 */}
            <PostIcon onClick={handleShow}>
              <LocalAtmRoundedIcon />
              <div>
                <CountText>{avgPriceState}</CountText>
              </div>
            </PostIcon>

            {/* 스크랩 인터페이스 */}
            <PostIcon>
              {isScrapState ? (
                <BookmarkIcon onClick={() => changeScrap(postId)} />
              ) : (
                <BookmarkBorderRoundedIcon onClick={() => changeScrap(postId)} />
              )}
            </PostIcon>
          </div>
        </PostFooterIcons>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>금액 평가</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>얼마면 돼?</p>
            <img src={postImage[0]} alt="" style={{ maxWidth: "100%", borderRadius: "6px" }} />
            <div>
              <input
                type="number"
                placeholder="금액을 입력하세요"
                onChange={(e) => setMyPrice(e.target.value)}
                style={{
                  textAlign: "center",
                  width: "100%",
                  padding: "10px",
                  margin: "10px 0",
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
        </Modal.Footer>
      </Modal>
      </PostContainer>
    );
  }
);

export default Post;

const PostContainer = styled.div`
  margin: 0px -20px 50px -20px;
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
