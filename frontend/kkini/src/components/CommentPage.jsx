import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [replyToIndex, setReplyToIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const newComments = [...comments];
      if (replyToIndex !== null) {
        newComments[replyToIndex].replies[editIndex] = comment;
      } else {
        newComments[editIndex].text = comment;
      }
      setComments(newComments);
      setEditIndex(null);
      setReplyToIndex(null);
    } else {
      if (replyToIndex !== null) {
        const newComments = [...comments];
        newComments[replyToIndex].replies.push(comment);
        setComments(newComments);
      } else {
        setComments([...comments, { text: comment, replies: [] }]);
      }
    }
    setComment('');
  };

  const handleEditClick = (commentIndex, replyIndex = null) => {
    setEditIndex(commentIndex);
    setReplyToIndex(replyIndex);
    const targetCommentText = replyIndex !== null ? comments[replyIndex].replies[commentIndex] : comments[commentIndex].text;
    setComment(targetCommentText);
  };

  const handleDeleteClick = (commentIndex, replyIndex = null) => {
    const newComments = [...comments];
    if (replyIndex !== null) {
      newComments[replyIndex].replies.splice(commentIndex, 1);
    } else {
      newComments.splice(commentIndex, 1);
    }
    setComments(newComments);
    if (replyToIndex === commentIndex) {
      setReplyToIndex(null);
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
            <button onClick={() => handleReplyClick(index)}>답글 달기</button>
            <button onClick={() => handleEditClick(index)}>수정</button>
            <button onClick={() => handleDeleteClick(index)}>삭제</button>
            {item.replies.map((reply, replyIndex) => (
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

  > Avatar {
    margin-right: 10px;
  }
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
  &:hover {
    background-color: #0056b3;
  }
`;

export default CommentsPage;
