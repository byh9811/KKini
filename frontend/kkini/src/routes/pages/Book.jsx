import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/prac.css';

function Book() {
  const canvasRef = useRef(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  const generateRandomAnimation = () => {
    const randomDuration = Math.floor(Math.random() * 15 + 6);
    const randomDelay = Math.floor(Math.random() * 5) - 5;
    const randomDegree = Math.floor(Math.random() * 360);
    const randomScale = Math.random() * 2 - 0.4;
    const randomBlur = Math.floor(Math.random() * 10);
    const randomLeft = Math.floor(Math.random() * 120 - 20);
    
    return {
      left: `${randomLeft}%`,
      animation: `raise ${randomDuration}s linear infinite`,
      animationDelay: `${randomDelay}s`,
      transform: `scale(${randomScale}) rotate(${randomDegree}deg)`,
      zIndex: Math.floor(Math.random() * 3) - 7,
      filter: `blur(${randomBlur}px)`
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/collection`);
        setData(res.data.response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
    const halfHeight = document.documentElement.scrollHeight / 2;
    window.scrollTo(0, halfHeight);

  }, []);

  return (
    <div>
      <canvas ref={canvasRef} ></canvas>
      <div className="grid image-grid">
        {
          data.map((item, index) => (
            <div className="grid-block" key={item.id}>
              <div className="tile">
                <a className="tile-link" href="#">
                  <img className="tile-img" src={item.image} alt="Image" />
                </a>
                {/* <svg className="svg" style={generateRandomAnimation()}>
                  <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />
                  <rect x="60" y="60" width="30" height="30" stroke="black" strokeWidth="2" fill="green" />
                </svg> */}
                <img className="svg" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMjJfMTQ5%2FMDAxNjExMjgzOTU1Mjcx.eq_cWTPv_IXvWLJWxdFcSqayqejqpMylVII-n1iYMdIg.DT5mxxujq2BeBE8GLQctmEXzoBXPPRn3g-qTUCMEz4og.PNG.hwanter%2F%25B9%25E9%25C1%25BE%25BF%25F8.png&type=sc960_832" alt="Description" style={generateRandomAnimation()} />

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
