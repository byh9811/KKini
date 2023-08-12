import React, { useState, useEffect } from 'react';
import Timeline from '../../components/home/Timeline';
import axios from 'axios';

function N1() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/post?page=0&size=5&sort=string')
      .then((response) => {
        if (response.data.success) {
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

export default N1;
