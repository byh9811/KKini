import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/prac.css';

const colors = ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"];

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function ConfettiParticle(props) {
    const style = {
        position: 'absolute',
        backgroundColor: props.color,
        width: '10px',
        height: '10px',
        top: `${props.y}px`,
        left: `${props.x}px`,
        transform: `rotate(${props.angle}deg)`,
        animation: `fall ${props.duration}s linear infinite`
    };
    return <div style={style}></div>;
}

function Confetti() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = [];
        for (let i = 0; i < 150; i++) {
            newParticles.push({
                color: colors[Math.floor(Math.random() * colors.length)],
                x: randomFromTo(0, window.innerWidth),
                y: randomFromTo(0, -window.innerHeight),
                angle: randomFromTo(0, 360),
                duration: randomFromTo(5, 10)
            });
        }
        setParticles(newParticles);
    }, []);

    return (
        <div>
            {particles.map((particle, index) => (
                <ConfettiParticle key={index} {...particle} />
            ))}
        </div>
    );
}

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
  }, []);

  const chunkedData = [];
  for (let i = 0; i < data.length; i += 5) {
      chunkedData.push(data.slice(i, i + 5));
  }

  return (
      <div>
          <Confetti />
          {chunkedData.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="grid image-grid">
                  {chunk.map((item, index) => (
                      <div className="grid-block" key={item.id}>
                          <div className="tile">
                              <a className="tile-link" href="#">
                                  <img className="tile-img" src={item.image} alt="Image" />
                              </a>
                              <img className="svg" src="img/누끼종원.png" alt="Description" style={generateRandomAnimation()} />
                          </div>
                      </div>
                  ))}
              </div>
          ))}
          <button onClick={() => navigate(-1)}>
              <svg className="backButtonSvg" viewBox="45 60 400 320" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#1a1717" d="M 90 210 C 90 180 90 150 90 150 C 150 150 180 150 180 150 C 180 150 300 150 300 150 C 300 150 330 150 390 150 C 390 150 390 180 390 210 C 390 240 390 270 390 270 C 330 270 300 270 300 270 C 300 270 180 270 180 270 C 180 270 150 270 90 270 C 90 270 90 240 90 210" mask="url(#knockout-text)"></path>
                  <mask id="knockout-text">
                      <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
                      <text x="147" y="227" fill="#000"> 돌아가기</text>
                  </mask>
              </svg>
          </button>
      </div>
  );
}

export default Book;