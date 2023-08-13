import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CommentsPage({ comments, onCommentsChange, postId }) {
  const [comment, setComment] = useState(comments);
  const [replyToIndex, setReplyToIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const location = useLocation();

  const effectivePostId = postId || location.state?.postId;
  console.log(comments)
  useEffect(() => {
    if (!effectivePostId) {
      console.error("postId is not defined.");
      return;
    }

    if (submitTrigger) {
      const submitComment = async () => {
        let data = {
          postId: effectivePostId,
          contents: comment
        };

        let endpoint;
        let method;

        if (editIndex !== null) {
          endpoint = `http://localhost:8080/api/comment/update/${editIndex}`;
          method = 'PUT';
        } else {
          endpoint = `http://localhost:8080/api/comment/`;
          method = 'POST';
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
          console.error("Error posting comment:", error.response ? error.response.data : error.message);
        }
      };

      submitComment();
      setComment('');
      setEditIndex(null);
      setReplyToIndex(null);
      setSubmitTrigger(false);
    }
  }, [submitTrigger, effectivePostId, comment, onCommentsChange, editIndex, replyToIndex]);

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
    const targetCommentText = replyIndex !== null ? comments[replyIndex].replies[commentIndex] : comments[commentIndex].text;
    setComment(targetCommentText);
  };

  const handleDeleteClick = async (commentIndex) => {
    try {
      const response = await axios.delete(`/comment/delete/${commentIndex}`);
      console.log('삭제됨')
      if (response.data.success) {
        onCommentsChange(); // 댓글 삭제 후 댓글 목록 다시 가져오기
      }
    } catch (error) {
      console.error("Error deleting comment:", error.response ? error.response.data : error.message);
    }
  };

  const handleReplyClick = (index) => {
    setReplyToIndex(index);
    setEditIndex(null);
  };

  const handleReplyCancel = () => {
    setReplyToIndex(null);
    setComment('');
  };

  return (
    <CommentsContainer>
      
      <CommentsList>
      {comments.map((item, index) => (
    <Comment key={index}>
        <CommentContent>
            <Avatar />
            {item.text}
        </CommentContent>
        <h3>{item.parents.contents}</h3>
        <button onClick={() => handleReplyClick(index)}>답글 달기</button>
        <button onClick={() => handleEditClick(index)}>수정</button>
        <button onClick={() => handleDeleteClick(index)}>삭제</button>
        {item.replies && item.replies.map((reply, replyIndex) => (
            <Reply key={replyIndex}>
                <CommentContent>
                    <Avatar />
                    {reply}
                </CommentContent>
                <button onClick={() => handleEditClick(replyIndex, index)}>수정</button>
                <button onClick={() => handleDeleteClick(replyIndex, index)}>삭제</button>
            </Reply>
        ))}
    </Comment>
))}
      </CommentsList>
      <CommentForm onSubmit={handleCommentSubmit}>
        <CommentInput
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요..."
        />
        <CommentButton type="submit">{editIndex !== null ? '수정하기' : '댓글 작성'}</CommentButton>
      </CommentForm>
      {replyToIndex !== null && (
        <div>
          답글 작성 중: {comments[replyToIndex].text}
          <button onClick={handleReplyCancel}>답글 취소</button>
        </div>
      )}
    </CommentsContainer>
  );
}

const CommentsContainer = styled.div`
  max-width: 550px;
  margin: 30px auto;
  padding: 10px;
`;

const CommentsList = styled.div`
  margin-bottom: 20px;
`;

const Comment = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const CommentContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Reply = styled.div`
  padding: 10px;
  margin-left: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
`;

const CommentButton = styled.button`
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default CommentsPage;
