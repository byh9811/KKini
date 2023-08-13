import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function P2Recipe() {
  window.scrollTo(0, 0);

  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    axios.get('/recipe/mypage', {
      prams: {
        page: 0,
      }
    })
      .then(response => {
        setRecipesList(response.data.response.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <div>
      {
        recipesList.map((item) => (
          <div key={item.recipeId}>
            <img src={item.recipeImage} alt={`Image ${item.recipeId}`} />
          </div>
        ))
      }
    </div>
    
  );
}

export default P2Recipe;
