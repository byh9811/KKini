import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FeedDetail(props) {
  const recipeId = props.recipeId;
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    axios.get(`/recipe/${recipeId}`)
      .then(response => {
        setRecipeData(response.data.response);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
      });
  }, [recipeId]);

  return (
    <div>
      {recipeData && (
        <div>
          <img src={recipeData.image} alt={`Image ${recipeData.recipeId}`} />
          <p>분류: {recipeData.categoryName}</p>
          <p>이름: {recipeData.name}</p>
          <p>시간: {recipeData.time}</p>
          <p>재료: {recipeData.ingredient}</p>
          <p>단계: {recipeData.steps}</p>
        </div>
      )}
    </div>
  );
}

export default FeedDetail;
