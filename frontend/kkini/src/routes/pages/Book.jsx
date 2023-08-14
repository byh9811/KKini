import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './prac.css'; // Assuming prac.css is in the same directory as Book component
import '../../css/prac.css'

function Book() {
  const canvasRef = useRef(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  
>>>>>>> 6ec182e2e5fa7b71947bd8b5e3a67bd2532a7ab4


  // 여기서우선 받아와야함
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await axios.get(`/collection`);
          setData(res.data.response);
          console.log(res.data.response)
          console.log(res.data.response[1].image)
      } catch (error) {
          console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} ></canvas>
      <div className="grid image-grid">
  {
    data.map(item => (
      <div className="grid-block" key={item.id}> {/* key prop is added here */}
        <div className="tile">
          <a className="tile-link" href="#">
            <img className="tile-img" src={item.image} alt="Image" />
          </a>
        </div>
      </div>
    ))
  }
</div>

      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default Book;
