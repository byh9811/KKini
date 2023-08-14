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
  (
    {
      user,
      postImage,
      createDateTime,
      likeCnt,
      disLikeCnt,
      commentCnt,
      contents,
      avgPrice,
      myPrice,
      reaction,
      recipeName,
      postId,
      isScrap,
    },
    ref
  ) => {
    const [reactionState, setReaction] = useState(reaction);
    const [likeCntState, setLikeCnt] = useState(likeCnt);
    const [disLikeCntState, setDisLikeCnt] = useState(disLikeCnt);
    const [commentCntState, setCommentCnt] = useState(commentCnt);
    const [isScrapState, setIsScrap] = useState(isScrap);
    const [avgPriceState, setAvgPrice] = useState(avgPrice);
    const [myPriceState, setMyPrice] = useState(myPrice);
    const [priceModalShow, setPriceModalShow] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    // 스크랩
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

    // 반응
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

    // 금액 닫기
    const handleClose = () => {
      setPriceModalShow(false);
    };

    // 금액 열기
    const handleShow = () => setPriceModalShow(true);

    // 금액 입력
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
            {/* 좋아요 인터페이스 */}
            <PostIcon>
              <FavoriteBorderIcon
                style={{ color: reactionState === true ? "red" : "gray" }}
                onClick={() => handleIconClick(true)}
              />
            </PostIcon>

            {/* 싫어요 인터페이스 */}
            <PostIcon>
              <ThumbDownOffAltRoundedIcon
                style={{ color: reactionState === false ? "blue" : "gray" }}
                onClick={() => handleIconClick(false)}
              />
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
                <b>{likeCntState}</b>좋아요 <b>{disLikeCntState}</b>싫어요{" "}
                <b>{commentCntState}</b>
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
                <BookmarkBorderRoundedIcon
                  onClick={() => changeScrap(postId)}
                />
                  onClick={() => changeScrap(postId)}
                />
              )}
            </PostIcon>
          </div>
        </PostFooterIcons>

        <Modal
          open={priceModalShow}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              금액 평가창
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              이 음식이 얼마처럼 보이나요???
              <img
                src={postImage}
                alt=""
                style={{ maxWidth: "100%", borderRadius: "6px" }}
              />
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
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
              <Button variant="primary" onClick={handleSave}>
                금액 평가 완료
              </Button>
            </Typography>
          </Box>
        </Modal>
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
