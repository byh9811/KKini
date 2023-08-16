import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import Post from "../../components/home/Post.jsx";
import { useInView } from "react-intersection-observer";

function N1Home() {
  const [posts, setPosts] = useState([]);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  // 포스트 호출
  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/post", {
        params: {
          page: page,
        },
      });
      setPosts((prevState) => [...prevState, ...response.data.response.content]);
    } catch (error) {
      console.error("포스트 가져오기 오류 : " + error);
    }
    setLoading(false);
  }, [page]);

  // 상태 관리
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // 보고있으면서 로딩이 끝났으면
  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  const navigate = useNavigate();

  // 만들러 가기
  const goMake = () => {
    navigate("/home/make");
  };

  return (
    <div>
      {posts.length === 0 ? (
        <div>
          <p>등록된 글이 없어요</p>
          <p>글을 등록하러 가 볼까요 ?</p>
          <Button onClick={goMake}>업로드</Button>
        </div>
      ) : (
        posts.map((post, index) => (
          <React.Fragment key={index}>
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
              ref={index === posts.length - 1 ? ref : null}
            />
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default N1Home;
