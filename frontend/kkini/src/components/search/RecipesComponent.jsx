import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipesComponent = (props) => {
  const { 검색어, 카테고리ID } = props;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/recipe/search', {
      params: {
        categoryId: 카테고리ID,
        name: 검색어,
        page: 0,
      }
    })
      .then(response => {
        console.log(response.data.response.content)
        setRecipes(response.data.response.content);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, [검색어, 카테고리ID]);

  return (
    <div>
      {
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <img src={recipe.recipeImage} alt={`Image ${recipe.id}`} />
            {recipe.recipeName}
            {recipe.writerName}
          </div>
        ))
      }
    </div>
  );
}

export default RecipesComponent;
