import React, { useEffect, useState } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RecipesComponent = (props) => {
  const { 검색어, 카테고리ID } = props;
  const [recipes, setRecipes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

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
        setRecipes(response.data.response.content);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [검색어, 카테고리ID]);

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <img src={recipe.recipeImage} alt={`Image ${recipe.id}`} onClick={() => setSelectedId(recipe.id)} />
          {recipe.recipeName}
          {recipe.writerName}

          <Modal
            open={selectedId === recipe.id}
            onClose={() => setSelectedId(null)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={selectedId === recipe.id}>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {recipe.recipeName}
                  {recipe.writerName}
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default RecipesComponent;
