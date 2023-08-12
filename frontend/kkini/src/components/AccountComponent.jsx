import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountComponent = (props) => {
  const { 검색어 } = props;
  const [데이터, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/member/search/${검색어}?page=0&size=10&sort=string`)
    .then(response => {
      setData(response.data.response.content);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [검색어]);

  return (
    <div>
      {
        데이터
        ? <div>
            {
              데이터.map((item) => 
                <div key={item.id}>
                  <img src={item.image} alt={`Image ${item.memberId}`} />
                  {item.nickname}
                </div>
              )
            }
          </div>
        : null
      }
    </div>
  );
};

export default AccountComponent;
