import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipesModal from '../recipe/RecipesModal';

const RecipesComponent = (props) => {
  const { 검색어, 카테고리ID } = props;
  const [recipes, setRecipes] = useState([]);
  console.log(recipes)

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("/recipe/search", {
        params: {
          categoryId: 카테고리ID,
          name: 검색어,
          page: 0,
        },
      })
      .then((response) => {
        console.log(response.data.response.content);
        setRecipes(response.data.response.content);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [검색어, 카테고리ID]);

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
        recipes.map((item) => (
          <div key={item.id}>
            <img src={item.recipeImage} alt={`Image ${item.id}`} onClick={() => handleRecipeClick(item)} />
            {item.recipeName}
            <br />
            {item.writerName}
          </div>
        ))
      }
      {selectedRecipe !== null && (
        <RecipesModal recipeId={selectedRecipe.recipeId} handleClose={handleCloseModal} show={showModal} />
      )}
    </div>
  );
};

export default RecipesComponent;
