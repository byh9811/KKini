import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/recipe.css";
import FeedModal from "./../feed/FeedModal";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";

const RecommendedFeed = () => {
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlePostClick = (id) => {
    setSelectedPost(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/post/algorithm", {
        params: {
          page: 0,
        },
      })
      .then((response) => {
        setData(response.data.response.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="recipes-grid">
      {data.map((item) => (
        <div key={item.id} className="recipe-item">
          <img src={item.imageList[0]} alt={`Image ${item.id}`} onClick={() => handlePostClick(item)} />
          <div className="recipe-overlay">
            <div><FavoriteBorderIcon /> {item.likeCnt}</div>
                <div><ThumbDownOffAltRoundedIcon /> {item.disLikeCnt}</div>
                <div>{item.memberName}</div>
              </div>
        </div>
      ))}
      {selectedPost !== null && <FeedModal selectedPost={selectedPost} handleClose={handleCloseModal} show={showModal} />}
    </div>
  );
};

export default RecommendedFeed;
