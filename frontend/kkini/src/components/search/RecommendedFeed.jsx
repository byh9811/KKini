import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/recipe.css";
import FeedModal from './../feed/FeedModal';

const RecommendedFeed = () => {
  const [data, setData] = useState([]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePostClick = (id) => {
    setSelectedPost(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get("/post/algorithm", {
        params: {
          page: 0,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data.response.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="recipes-grid">
      {data.map((item) => (
        <div key={item.id} className="recipe-item">
          <img src={item.imageList[0]} alt={`Image ${item.id}`} onClick={() => handlePostClick(item)} />
        </div>
      ))}
      {selectedPost !== null && <FeedModal selectedPost={selectedPost} handleClose={handleCloseModal} show={showModal} />}
    </div>
  );
};

export default RecommendedFeed;
