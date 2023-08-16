import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../css/comment.css";

function CommentsPage({ comments, onCommentsChange, postId }) {
  const [comment, setComment] = useState(comments);
  const [replyToIndex, setReplyToIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const location = useLocation();

  const effectivePostId = postId || location.state?.postId;

  useEffect(() => {
    if (!effectivePostId) {
      console.error("postId is not defined.");
      return;
    }

    if (submitTrigger) {
      const submitComment = async () => {
        let data = {
          postId: effectivePostId,
          contents: comment,
        };

        let endpoint;
        let method;

        if (editIndex !== null) {
          endpoint = `http://localhost:8080/api/comment/update/${editIndex}`;
          method = "PUT";
        } else {
          endpoint = `http://localhost:8080/api/comment/`;
          method = "POST";
          if (replyToIndex !== null) {
            data.parentsId = replyToIndex;
          }
        }

        try {
          const response = await axios({ method, url: endpoint, data });
          if (response.data.success) {
            onCommentsChange(); // 댓글 작성, 수정, 삭제 후 댓글 목록 다시 가져오기
          }
        } catch (error) {
          console.error(
            "Error posting comment:",
            error.response ? error.response.data : error.message
          );
        }
      };

      submitComment();
      setComment("");
      setEditIndex(null);
      setReplyToIndex(null);
      setSubmitTrigger(false);
    }
  }, [
    submitTrigger,
    effectivePostId,
    comment,
    onCommentsChange,
    editIndex,
    replyToIndex,
  ]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!effectivePostId) {
      return;
    }

    setSubmitTrigger(true);
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleEditClick = (commentIndex, replyIndex = null) => {
    setEditIndex(commentIndex);
    setReplyToIndex(replyIndex);
    const targetCommentText =
      replyIndex !== null
        ? comments[replyIndex].replies[commentIndex]
        : comments[commentIndex].text;
    setComment(targetCommentText);
  };

  const handleDeleteClick = async (commentIndex) => {
    try {
      const response = await axios.delete(`/comment/${commentIndex}`);
      console.log("삭제");
      console.log(commentIndex);
      if (response.data.success) {
        onCommentsChange(); // 댓글 삭제 후 댓글 목록 다시 가져오기
      }
    } catch (error) {
      console.error(
        "Error deleting comment:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleReplyClick = (index) => {
    setReplyToIndex(index);
    setEditIndex(null);
  };

  const handleReplyCancel = () => {
    setReplyToIndex(null);
    setComment("");
  };

  return (
    <div className="CommentsContainer">
      <div className="CommentsList">
        {comments &&
          comments.map((item, index) => (
            <div className="Comment" key={index}>
              <div className="CommentContent">
                <Avatar />
                {item.text}
              </div>
              <h3>{item.parents.contents}</h3>
              {/* <button onClick={() => handleReplyClick(item.parents.id)}>
                답글 달기
              </button>
              <button onClick={() => handleEditClick(item.parents.id)}>
                수정
              </button> */}
              <button onClick={() => handleDeleteClick(item.parents.id)}>
                삭제
              </button>
              {item.replies &&
                item.replies.map((reply, replyIndex) => (
                  <div className="Reply" key={replyIndex}>
                    <div className="CommentContent">
                      <Avatar />
                      {reply}
                    </div>
                    <button onClick={() => handleEditClick(replyIndex, index)}>
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteClick(replyIndex, index)}
                    >
                      삭제
                    </button>
                  </div>
                ))}
            </div>
          ))}
      </div>
      <div className="CommentForm" onSubmit={handleCommentSubmit}>
        <input
          className="CommentInput"
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요..."
        />
        <button className="CommentButton" type="submit">
          {editIndex !== null ? "수정하기" : "댓글 작성"}
        </button>
      </div>
      {replyToIndex !== null && (
        <div>
          답글 작성 중: {comments[replyToIndex].text}
          <button onClick={handleReplyCancel}>답글 취소</button>
        </div>
      )}
    </div>
  );
}

export default CommentsPage;
