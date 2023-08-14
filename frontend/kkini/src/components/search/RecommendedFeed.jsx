import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedFeed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/post/algorithm', {
      params: {
        page: 0,
      }
    })
      .then(response => {
        console.log(response.data.response.content);
        setData(response.data.response.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {
        data.map((item) => (
          <div key={item.id}>
            <img src={item.imageList[0]} alt={`Image ${item.id}`} />
          </div>
        ))
      }
    </div>
  );
};

export default RecommendedFeed;
