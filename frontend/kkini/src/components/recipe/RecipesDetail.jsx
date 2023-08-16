import React, { useEffect, useState } from "react";
import axios from "axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function RecipesDetail(props) {
  const recipeId = props.recipeId;
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    axios
      .get(`/recipe/${recipeId}`)
      .then((response) => {
        console.log(response);
        setRecipeData(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });
  }, [recipeId]);

  return (
    <div>
      {recipeData && (
        <div>
          <h3 className="text-center">
            <LocalDiningIcon />
            {recipeData.name}
          </h3>
          <img style={{ maxHeight: "300px" }} src={recipeData.image} alt={`Image ${recipeData.recipeId}`} />
          <ListGroup style={{ listStyle: "none" }}>
            <ListGroupItem>분류: {recipeData.categoryName}</ListGroupItem>
            <ListGroupItem>
              <AccessTimeIcon></AccessTimeIcon>시간: {recipeData.time} 분
            </ListGroupItem>
            <ListGroupItem>재료: {recipeData.ingredient}</ListGroupItem>
            <ListGroupItem>단계: {recipeData.steps}</ListGroupItem>
          </ListGroup>
        </div>
      )}
    </div>
  );
}

export default RecipesDetail;
