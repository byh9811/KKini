import React, { useEffect, useState } from "react";
import axios from "axios";

function P4Scrap() {
  window.scrollTo(0, 0);
  const [scrapList, setScrapList] = useState([]);

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
      <div className="flex flex-wrap">
        {scrapList.length > 0 ? (
          <div className="flex flex-wrap">
            {scrapList.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={`Image ${item.id}`} />
              </div>
            ))}
          </div>
        ) : (
          <p>등록된 스크랩이 없습니다</p>
        )}
      </div>
    </div>
  );
}

export default P4Scrap;
