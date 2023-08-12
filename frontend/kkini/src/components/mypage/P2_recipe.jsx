// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import { axios } from 'axios';

// function P2_recipe() {
//   window.scrollTo(0, 0);

//   const [recipesList, setRecipesList] = useState([]);

//   useEffect(() => {
//     axios.get('', {
//       prams: {
//         page: 0
//       }
//     })
//       .then(response => {
//         setRecipesList(response.data.response.content);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);
  
//   return (
//     <div>
//       <h2>레시피입니다아아아</h2>
//     </div>
    
//   );
// }

// export default P2_recipe;
