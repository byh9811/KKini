import React, { useEffect, useState } from "react";
import ReqUserPostCard from "./ReqUserPostCard";
import axios from "axios";

function P1_post() {
  window.scrollTo(0, 0);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios.get("/post/mypage", {
      params: {
        page: 0,
      }
    })
    .then((res) => {
      setPostList(res.data.response.content);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap">
        {postList.map((item) => (
          <div key={item.id}>
            <img src={item.imageList[0]} alt={`Image ${item.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default P1_post;
