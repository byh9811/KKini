import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
// 도감
function Book() {

  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`/api/collection`)
      .then((res) => {
        setData(res.data.response);
      } catch (error) {
      } catch (error) {
        console.error("Error fetching posts:", error);
      });
  }, [data])
  
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      {chunkedData.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="grid image-grid">
          {chunk.map((item, index) => (
            <div className="grid-block" key={item.id}>
              <div className="tile">
                <a className="tile-link" href="#">
                  <img className="tile-img" src={item.image} alt="Image" />
                </a>
                <img className="svg" src="https://o.remove.bg/downloads/6a03de1c-0136-4b3f-a568-08802065548f/%EB%B0%B1%EC%A2%85-removebg-preview.png" alt="Description" style={generateRandomAnimation()} />
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

