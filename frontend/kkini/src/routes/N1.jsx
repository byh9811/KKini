import React, { useState, useEffect } from 'react';
import Timeline from '../components/Timeline';
import axios from 'axios';
import Drawer from '../components/Drawer';
function N1() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null); // 추가된 상태

  


  useEffect(() => {
    axios.get('/post?page=0&size=5&sort=string')
      .then((response) => {
        if (response.data.success) {
          console.log(typeof response.data.response, response);
          setPosts(response.data.response)
          console.log(response.data.response.content[0].id)
  
        }
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  const handlePostSelect = (postId) => {
    setSelectedPostId(postId);
  };
  console.log(posts)
  return (
    <div className='homepage'>
      <div className='homepage__timeline'>
        <Timeline posts={posts} onSelectPost={handlePostSelect} />
        {selectedPostId && <Drawer isOpen={!!selectedPostId} onClose={() => setSelectedPostId(null)} postId={selectedPostId} />} 
      </div>
    </div>
  );;
}

export default N1;
