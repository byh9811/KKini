import React, { useState, useEffect } from 'react'
import { useInView } from "react-intersection-observer";
import Post from './Post.jsx';

function Timeline() {
  const [posts, setPosts] = useState([
    {
      user: "김승영",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 12,
      timestamp:"2d",
    },
    {
      user: "이승태",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 23,
      timestamp:"2d",
    },
    {
      user: "박태규",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 31,
      timestamp:"2d",
    },
    {
      user: "배용현",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 31,
      timestamp:"2d",
    },
    {
      user: "김범창",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 31,
      timestamp:"2d",
    },
    {
      user: "진병욱",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 31,
      timestamp:"2d",
    }
  ]);
  
  const { ref, inView } = useInView({
    threshold: 0,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      const addItems = () => {
        const newPosts = [];
        for (let i = 0; i < 1; i++) {
          newPosts.push({
              user:"T발씨병욱",
              postImage:"https://i.namu.wiki/i/YIFgu56EdKbIZhjloRMQTkOn-PzfvyKhuvNkW3OgmSLVFCedvmyUk9HTtFHs0XnD0fcB49kHEgi6TnYACh2jFJ1fEHEv-_rpvvX161atfoxBq4SryJps1foRUiVXMEVHqg60llEZmdMEQMuA1b8UKA.webp",
              likes:"18",
              timestamp:"18s",
          });
        }
      setPosts((current) => [...current, ...newPosts]);
      setLoading(false);
    };
      console.log("무한 스크롤링 요청!");
      addItems();
    }
  }, [inView]);

  return (
    <div className='timeline'>
      <div className='timeline_posts'>
        {
          posts.map((post, index) => {
            return (
              <Post
              key={index}
              user={post.user}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
              ></Post>              
            )
          })
        }
        <Post ref={ref}></Post>
      </div>
    </div>
  )
}

export default Timeline;
