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
      contents: "안녕안녕",
      hatecnt: 11,
      commentcnt: 2,
      avgprice: 1200,
      reaction: false,


    },
    {
      user: "이승태",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 23,
      timestamp:"2d",
      contents: "안녕안녕"
    },
    {
      user: "박태규",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 31,
      timestamp:"2d",
      contents: "안녕안녕"
    },
    {
      user: "배용현",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 31,
      timestamp:"2d",
      contents: "안녕안녕"
    },
    {
      user: "김범창",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 31,
      timestamp:"2d",
      contents: "안녕안녕"
    },
    {
      user: "진병욱",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likes: 31,
      timestamp:"2d",
      contents: "안녕안녕"
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
              postImage:"https://i.namu.wiki/i/Fyh_vPFIbzkztGRXmAmT2UQGfQtaYANxjGPXhLhzOysKa0_b-XKj7AHzGyCxJ8lJRiZj4SMZcCJNRYK5d2Ztaefe4G9gE1ZkMzpI-aQj-61fNkElRMV-AnlB9mqlWDfd2UQbrd8pUpDjpXAH1LODyw.webp",
              likes:"18",
              timestamp:"18s",
              contents: "안녕안녕"
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
              contents={post.contents}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
              hatecnt={post.hatecnt}
              commentcnt={post.commentcnt}
              avgprice={post.avgprice}
              reaction={post.reaction}
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
