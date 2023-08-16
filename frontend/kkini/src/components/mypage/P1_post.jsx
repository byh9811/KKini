import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/recipe.css'

function P1Post() {
  window.scrollTo(0, 0);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get("/post/mypage", {
        params: {
          page: 0,
        },
      })
      .then((res) => {
        setPostList(res.data.response.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {postList.length > 0 ? (
        <div className="recipes-grid">
          {postList.map((item) => (
            <div key={item.id} className='recipe-item'>
              <img src={item.imageList[0]} alt={`Image ${item.id}`} />
              <div className="recipe-overlay">
                <div>{item.memberName}</div>
            </div>
            </div>
          ))}
        </div>
      ) : (
        <p>등록된 게시글이 없어요</p>
      )}
    </div>
  );
}

export default P1Post;
