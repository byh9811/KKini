import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountComponent = (props) => {
  const { 검색어 } = props;
  const [데이터, setData] = useState(null);

  useEffect(() => {
    axios.get('주소', {
      params: {
        search: 검색어
      }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [검색어]);

  return (
    <div>
      {
        데이터 ? (
          <div>
            <h2>검색 결과</h2>
            <ul>
              {데이터.map((item) => (
                <div key={item.id}>{item.title}</div>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
  );
};

export default AccountComponent;
