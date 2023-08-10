import React, { useState, useEffect } from 'react'
import { useInView } from "react-intersection-observer";
import Post from './Post.jsx';

function Timeline() {
  const [posts, setPosts] = useState([
    {
      user: "김승영",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likeCnt: 12,
      disLikeCnt:13,
      createDateTime:"2d",
      contents: "안녕안녕",
      commentcnt: 2,
      avgPrice: 1200,
      reaction: null,
      Scrap: true,
      recipeId: 0,
      recipeName: "집밥",
    },
    {
      user: "이승태",
      postImage: [
        "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
        "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg"
      ],
      likeCnt: 23,
      disLikeCnt:13,
      createDateTime:"2d",
      contents: "안녕안녕",
      avgPrice:1300,
      commentcnt: 2,
    },
    {
      user: "박태규",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likeCnt: 31,
      disLikeCnt:13,
      createDateTime:"2d",
      contents: "안녕안녕",
      avgPrice:1234,
      commentcnt: 2,
    },
    {
      user: "배용현",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likeCnt: 31,
      disLikeCnt:13,
      createDateTime:"2d",
      contents: "안녕안녕",
      avgPrice:12345,
      commentcnt: 2,
    },
    {
      user: "김범창",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likeCnt: 31,
      disLikeCnt:13,
      createDateTime:"2d",
      contents: "안녕안녕",
      avgPrice:324325,
      commentcnt: 2,
    },
    {
      user: "진병욱",
      postImage: "https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg",
      likeCnt: 31,
      disLikeCnt:13,
      createDateTime:"2d",
      contents: "안녕안녕",
      avgPrice:463463,
      commentcnt: 2,
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
              user: "T발씨병욱",
              postImage: "https://i.namu.wiki/i/Fyh_vPFIbzkztGRXmAmT2UQGfQtaYANxjGPXhLhzOysKa0_b-XKj7AHzGyCxJ8lJRiZj4SMZcCJNRYK5d2Ztaefe4G9gE1ZkMzpI-aQj-61fNkElRMV-AnlB9mqlWDfd2UQbrd8pUpDjpXAH1LODyw.webp",
              likeCnt: 18,
              disLikeCnt:13,
              createDateTime:"18s",
              contents: "안녕안녕",
              avgPrice:463463,
              commentcnt: 2,
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
