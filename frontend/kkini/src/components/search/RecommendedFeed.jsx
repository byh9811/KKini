import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/recipe.css";
import { useNavigate } from "react-router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Post from "../home/Post";

const RecommendedFeed = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectPostId, setSelectPostId] = useState("");
  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    axios
      .get("/post/algorithm", {
        params: {
          page: 0,
        },
      })
      .then((response) => {
        setData(response.data.response.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setSelectPostId]);
  const goPostDetail = (postId) => {
    setSelectPostId(postId);
    axios
      .get(`/post/detail/${postId}`)
      .then((res) => {
        setSelectedPost(res.data.response);
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="recipes-grid">
        {data.map((item) => (
          <div key={item.id} className="recipe-item" onClick={() => goPostDetail(item.id)}>
            <img src={item.imageList[0]} alt={`Image ${item.id}`} />
          </div>
        ))}
      </div>

      <Modal show={show} animation={false}>
        <Modal.Body>
          <Post
            avgPrice={selectedPost.avgPrice}
            commentCnt={selectedPost.commentCnt}
            contents={selectedPost.contents}
            createDateTime={selectedPost.createDateTime}
            disLikeCnt={selectedPost.disLikeCnt}
            postId={selectedPost.id}
            postImage={selectedPost.imageList}
            isScrap={selectedPost.isScrap}
            likeCnt={selectedPost.likeCnt}
            user={selectedPost.memberName}
            myPrice={selectedPost.myPrice}
            reaction={selectedPost.reaction}
            recipeId={selectedPost.recipeId}
            recipeName={selectedPost.recipeName}
          ></Post>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecommendedFeed;
