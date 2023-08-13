import React, { useState, useEffect } from 'react';
import Timeline from '../../components/home/Timeline';
import axios from 'axios';
import Drawer from '../../components/home/Drawer';

function N1Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null); // 추가된 상태
  
  useEffect(() => {
    axios.get('/post', {
      params: {
        page: 0,
      }
    })
      .then((response) => {
        if (response.data.success) {
          setPosts(response.data.response);
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
    <div>
      <Timeline posts={posts} onSelectPost={handlePostSelect} />
      {selectedPostId && <Drawer isOpen={!!selectedPostId} onClose={() => setSelectedPostId(null)} postId={selectedPostId} />} 
    </div>
  );
}

export default N1Home;
