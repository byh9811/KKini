import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedFeed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <div>추천 피드 컴포넌트</div>
      {
        data.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))
      }
    </div>
  );
};

export default RecommendedFeed;
