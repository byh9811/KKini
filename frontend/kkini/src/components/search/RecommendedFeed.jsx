import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/recipe.css'

const RecommendedFeed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/post/algorithm', {
      params: {
        page: 0,
      }
    })
      .then(response => {
        setData(response.data.response.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='recipes-grid'>
      {
        data.map((item) => (
          <div key={item.id} className='recipe-item'>
            <img src={item.imageList[0]} alt={`Image ${item.id}`} />
            <div className="recipe-overlay">
                <div>{item.memberName}</div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default RecommendedFeed;
