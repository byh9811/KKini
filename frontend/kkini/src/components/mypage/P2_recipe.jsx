import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipesModal from '../recipe/RecipesModal';

function P2Recipe() {
  window.scrollTo(0, 0);

  const [recipesList, setRecipesList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('/recipe/mypage', {
      params: {
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

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipe(recipeId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setShowModal(false);
  };
  
  return (
    <div>
      {
        recipesList.map((item) => (
          <div key={item.recipeId}>
            <img src={item.recipeImage} alt={`Image ${item.recipeId}`} onClick={() => handleRecipeClick(item)} />
          </div>
        ))
      }
      {selectedRecipe !== null && (
        <RecipesModal recipeId={selectedRecipe.recipeId} handleClose={handleCloseModal} show={showModal} />
      )}
    </div>
  );
}

export default P2Recipe;
