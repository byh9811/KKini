import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/recipe.css'

function P4Scrap() {
  window.scrollTo(0, 0);
  const [scrapList, setScrapList] = useState([]);

  useEffect(() => {
    axios
      .get("/scrap/list/mypage")
      .then((res) => {
        setScrapList(res.data.response.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {scrapList.length > 0 ? (
        <div className='recipes-grid'>
          {scrapList.map((item) => (
            <div key={item.id} className='recipe-item'>
              <img src={item.image} alt={`Image ${item.id}`} />
              <div className="recipe-overlay">
                <div>{item.memberName}</div>
            </div>
            </div>
          ))}
        </div>
      ) : (
        <p>등록된 스크랩이 없어요</p>
      )}
    </div>
  );
}

export default P4Scrap;
