import React, { useState, useEffect } from 'react';
import Timeline from '../../components/home/Timeline';
import axios from 'axios';

function N1_home() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get('/post', {
      params: {
        page: 0,
      }
    })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.response)
          setPosts(response.data.response);
        }
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <Timeline posts={posts} />
    </div>
  );;
}

export default N1_home;
