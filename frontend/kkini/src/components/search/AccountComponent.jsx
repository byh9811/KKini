import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountComponent = (props) => {
  const { 검색어 } = props;
  const [데이터, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/member/search/${검색어}?page=0&size=10&sort=string`)
      .then((response) => {
        setData(response.data.response.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [검색어]);

  const goMypage = (memberId) => {
    navigate(`/home/info/${memberId}`);
  };

  return (
    <div>
      {데이터 ? (
        <div>
          {데이터.map((item) => (
            <div key={item.id}>
              <div onClick={() => goMypage(item.memberId)} style={{ cursor: "pointer" }}>
                <img src={item.image} alt={`Image ${item.memberId}`} />
                <p>{item.nickname}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>검색 결과가 존재하지 않습니다.</p>
      )}
    </div>
  );
};

export default AccountComponent;
