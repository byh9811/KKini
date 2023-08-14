import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/prac.css';

function Book() {
  const canvasRef = useRef(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/collection`);
        setData(res.data.response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      });
  }, [data])
  
  return (
    <div>
      도감
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      {
        data.map((item, index)=><div key={index}></div>)
      }
    </div>
    
  );
}

export default Book;
