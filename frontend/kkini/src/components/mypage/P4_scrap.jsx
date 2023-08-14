import ReqUserPostCard from "./ReqUserPostCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

function P4Scrap() {
  window.scrollTo(0, 0);
  const [scrapList, setScrapList] = useState([]);
  console.log('하이', scrapList)

  useEffect(() => {
    axios.get("/scrap/list/mypage")
    .then((res) => {
      setScrapList(res.data.response.content);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      {scrapList.length > 0 ? (
        <div className="flex flex-wrap">
          {scrapList.map((item) => (
            <img src={item.image} alt={`Image ${item.id}`} />
          ))}
        </div>
      ) : (
        <p>등록된 스크랩이 없습니다</p>
      )}
    </div>
  );
}

export default P4Scrap;