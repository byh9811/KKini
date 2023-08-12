import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedComponent = (props) => {
  const { 검색어 } = props;
  const [데이터, setData] = useState(null);

  useEffect(() => {
    // 무한 스크롤 적용하고 페이지 정보 업데이트하기
    axios.get('http://localhost:8080/api/post/search', {
      params: {
        search: 검색어,
        page: 0,
        size: 5,
      }
    })
      .then(response => {
        console.log(response.data.response.content)
        setData(response.data.response.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [검색어]);

  return (
    <div>
      {
        데이터
        ? <div>
            {
              데이터.map((item) =>
                <div key={item.id}>
                  <img src={item.imageList[0]} alt={`Image ${item.id}`} />
                </div>)
            }
          </div>
        : null
      }
    </div>
  );
};

export default FeedComponent;
