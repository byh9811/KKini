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
      })
      .catch((error) => {
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