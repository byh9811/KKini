import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CommentsPage({ comments = [], onCommentsChange, postId }) {
  const [comment, setComment] = useState('');
  const [replyToIndex, setReplyToIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const location = useLocation();
  // const postId = location.state?.postId;
  const locationPostId = location.state?.postId;

  useEffect(() => {
    console.log("Current postId:", postId);
    if (!locationPostId) {
      console.error("postId is not defined.");
      return;
    }

    if (submitTrigger) {
      const submitComment = async () => {
        let data = {
          postId,
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
          console.log(data)
          const response = await axios({ method, url: endpoint, data });
          if (response.data.success) {
            onCommentsChange(response.data.response);
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
  }, [submitTrigger]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
  
    if (!postId) {
      console.log('postid 안받아옴')
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
      const response = await axios.delete(`http://localhost:8080/api/comment/delete/${commentIndex}`);
      if (response.data.success) {
        console.log('삭제들어가나?')
        onCommentsChange(response.data.response);
      }
    } catch (error) {}
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
  border-radius: 5px;
`;

const CommentButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default CommentsPage;
