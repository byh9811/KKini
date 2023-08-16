import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Post from "../../components/home/Post.jsx";

function N1Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/post", {
        params: {
          page: 0,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setPosts(response.data.response.content);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const navigate = new useNavigate();

  const goMake = () => {
    navigate("/home/make");
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            index={index}
            avgPrice={post.avgPrice}
            commentCnt={post.commentCnt}
            contents={post.contents}
            createDateTime={post.createDateTime}
            disLikeCnt={post.disLikeCnt}
            postId={post.id}
            postImage={post.imageList}
            isScrap={post.isScrap}
            likeCnt={post.likeCnt}
            user={post.memberName}
            myPrice={post.myPrice}
            reaction={post.reaction}
            recipeId={post.recipeId}
            recipeName={post.recipeName}
          />
        ))
      ) : (
        <div>
          <p>등록된 게시글이 없어요</p>
          <p>게시글을 등록하러 가볼까요 ?</p>
          <Button onClick={goMake}>등록하기</Button>
        </div>
      )}
    </div>
  );
}

export default N1Home;