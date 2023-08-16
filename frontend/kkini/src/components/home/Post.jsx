import React, { forwardRef, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Modal, Button } from "react-bootstrap";
import Drawer from "./Drawer";
import axios from "axios";
import ImageSwiper from "./ImageSwiper";
import "../../css/posts.css";

import RecipesModal from "../recipe/RecipesModal";

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
      recipeId,
      postId,
      isScrap,
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const [reactionState, setReaction] = useState(reaction);
    const [likeCntState, setLikeCnt] = useState(likeCnt);
    const [disLikeCntState, setDisLikeCnt] = useState(disLikeCnt);
    const [isScrapState, setIsScrap] = useState(isScrap);
    const [avgPriceState, setAvgPrice] = useState(avgPrice);
    const [myPriceState, setMyPrice] = useState(myPrice);
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
      const oldReactionState = reactionState;

      axios
        .post(`/reaction`, {
          postId: postId,
          state: type,
        })
        .then((response) => {
          if (response.data.success) {
            setReaction(response.data.response);

            if (oldReactionState === null && type === true) {
              setLikeCnt(likeCntState + 1);
            }

            if (oldReactionState === null && type === false) {
              setDisLikeCnt(disLikeCntState + 1);
            }

            if (oldReactionState === true && type === false) {
              setLikeCnt(likeCntState - 1);
              setDisLikeCnt(disLikeCntState + 1);
            }

            if (oldReactionState === false && type === true) {
              setLikeCnt(likeCntState + 1);
              setDisLikeCnt(disLikeCntState - 1);
            }

            if (oldReactionState === true && type === true) {
              setLikeCnt(likeCntState - 1);
            }

            if (oldReactionState === false && type === false) {
              setDisLikeCnt(disLikeCntState - 1);
            }
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

    const [showModal, setShowModal] = useState(false);

    const handleRecipeClick = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    return (
      <div className="post-container" ref={ref}>
        <Drawer
          isOpen={isDrawerOpen}
          postId={postId}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        />

        {/* 헤더 */}
        <div className="post-header">
          <div className="post-header-author">
            <Avatar className="m-2" />
            <div className="userInfo">
              <div>{user}</div>
              <span>{day}</span>
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div className="contents-text">
          {contents}
          {recipeId && (
            <div onClick={() => handleRecipeClick(recipeId)}>
              # {recipeName}
            </div>
          )}
          {recipeId !== null && (
            <RecipesModal
              recipeId={recipeId}
              handleClose={handleCloseModal}
              show={showModal}
            />
          )}
        </div>

        {/* 이미지 */}
        <div className="post-image">
          <ImageSwiper postImage={postImage} />
        </div>

        {/* 컨트롤러 */}
        <div className="post-footer-icons">
          <div className="post-footer-icons-left">
            {/* 좋아요 인터페이스 */}
            <div className="post-icon">
              {reactionState === true ? (
                <FavoriteIcon
                  style={{
                    color: "red",
                  }}
                  onClick={() => handleIconClick(true)}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{
                    color: "red",
                  }}
                  onClick={() => handleIconClick(true)}
                />
              )}
            </div>

            {/* 싫어요 인터페이스 */}
            <div className="post-icon">
              {reactionState === false ? (
                <ThumbDownAltRoundedIcon
                  style={{ color: "blue" }}
                  onClick={() => handleIconClick(false)}
                />
              ) : (
                <ThumbDownOffAltRoundedIcon
                  style={{ color: "blue" }}
                  onClick={() => handleIconClick(false)}
                />
              )}
            </div>

            {/* 댓글 인터페이스 */}
            <div className="post-icon">
              <ChatBubbleOutlineRoundedIcon
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
              />
            </div>
          </div>

          <div className="post-footer-icons-left">
            {/* 금액 인터페이스 */}
            <div className="post-icon" onClick={handleShow}>
              <LocalAtmRoundedIcon />
            </div>

            {/* 스크랩 인터페이스 */}
            <div className="post-icon">
              {isScrapState ? (
                <BookmarkIcon onClick={() => changeScrap(postId)} />
              ) : (
                <BookmarkBorderRoundedIcon
                  onClick={() => changeScrap(postId)}
                />
              )}
            </div>
          </div>
        </div>

        {/* 포스트 상태 표시 */}
        <div>
          <div className="count-text">
            <b>{likeCntState}</b>좋아요&nbsp;
            <b>{disLikeCntState}</b>싫어요&nbsp;
            <b>{commentCnt}</b>댓글&nbsp;
            <b>{avgPriceState}</b>원
          </div>
        </div>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>금액 평가</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>얼마면 돼?</p>

            <div>
              <ImageSwiper postImage={postImage} />
            </div>

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
      </div>
    );
  }
);

export default Post;
