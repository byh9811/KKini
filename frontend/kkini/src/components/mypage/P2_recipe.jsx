import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function P2Recipe() {
  window.scrollTo(0, 0);

  const [recipesList, setRecipesList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  const handleRecipeClick = (id) => {
    setSelectedId(id);

    // 상세 정보 조회
    axios.get(`/api/recipe/${id}`)
      .then(response => {
        setSelectedRecipe(response.data.response);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
      });
  };
  
  return (
    <div>
      {
        recipesList.map((item) => (
          <div key={item.recipeId}>
            <img src={item.recipeImage} alt={`Image ${item.recipeId}`} onClick={() => handleRecipeClick(item.recipeId)}/>
            <Modal
              open={selectedId === item.recipeId}
              onClose={() => setSelectedId(null)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={selectedId === item.recipeId}>
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <img src={item.recipeImage} alt={`Image ${item.recipeId}`}/>
                    <div>
                      <h3>{selectedRecipe?.name}</h3>
                      <p>카테고리: {selectedRecipe?.categoryName}</p>
                      <p>작성자: {selectedRecipe?.writerName}</p>
                      <p>소요 시간: {selectedRecipe?.time}분</p>
                      <p>난이도: {selectedRecipe?.difficulty}</p>
                      <p>재료: {selectedRecipe?.ingredient}</p>
                      <ul>
                        {selectedRecipe?.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </div>
        ))
      }
    </div>
    
  );
}

export default P2Recipe;
