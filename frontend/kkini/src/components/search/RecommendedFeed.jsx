import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedFeed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/post/algorithm?page=0&size=5&sort=string')
      .then(response => {
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
