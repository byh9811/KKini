import ReqUserPostCard from "./ReqUserPostCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

function P4Scrap() {
  window.scrollTo(0, 0);
  const [scrapList, setScrapList] = useState([]);

  useEffect(() => {
    axios.get("/scrap/list")
    .then((res) => {
      setScrapList(res.data.response.content);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap">
        {scrapList.map((item) => (
          <ReqUserPostCard></ReqUserPostCard>
        ))}
      </div>
    </div>
  );
}

export default P4Scrap;