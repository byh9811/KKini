import React, { useState } from 'react'

import Post from './Post';

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
    },
  ]);
  return (
    <div className='timeline'>
      <div className='timeline_posts'>
        {posts.map((post) => 
          <Post
           user={post.user} 
           postImage={post.postImage} 
           likes={post.likes} 
           timestamp={post.timestamp} />
)};
      </div>
    </div>
  )
}

export default Timeline
