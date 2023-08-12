import React, { useState, useEffect } from 'react'
import Post from './Post.jsx';


function Timeline(props) {
  
  const transformData = (data) => {
    return data.map(post => ({
      user: post.memberName,
      postImage: post.imageList, // 여기는 간단히 수정했는데, 실제로 여러 이미지 처리가 필요하면 추가 수정이 필요합니다.
      likeCnt: post.likeCnt,
      disLikeCnt: post.disLikeCnt,
      createDateTime: post.createDateTime,
      contents: post.contents,
      commentcnt: post.commentCnt,
      avgPrice: post.avgPrice,
      reaction: post.reaction,
      Scrap: post.isScrap,
      recipeId: post.recipeId,
      recipeName: post.recipeName,
      postId: post.id,
      
    }));
    
  }

  const [localPosts, setLocalPosts] = useState(transformData(props.posts.content || [])); ////////0812 수정전

  // const [localPosts, setLocalPosts] = useState(transformData(props.posts || []));
  
  // const toggleReaction = (index) => {
  //   setLocalPosts((prevPosts) => {
  //     const newPosts = [...prevPosts];
  //     newPosts[index].reaction = !newPosts[index].reaction;
  //     return newPosts;
  //   });
  // };
  //서버상태도 업데이트해야함

  const toggleLike = (index) => {
    setLocalPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      if (newPosts[index].reaction) {
        newPosts[index].likeCnt--;
      } else {
        newPosts[index].likeCnt++;
      }
      newPosts[index].reaction = !newPosts[index].reaction;
      return newPosts;
    });
  };
  //서버상태도 업데이트해야함

  useEffect(() => {
    
    if (props.posts && props.posts.content) {
      setLocalPosts(transformData(props.posts.content));
    }
  }, [props.posts]);

  console.log(localPosts)

  return (
    <div className='timeline'>
      <div className='timeline_posts'>
        {localPosts.map((post, index) => (
          <Post
            key={index}
            index={index}
            user={post.user}
            contents={post.contents}
            postImage={post.postImage}
            likeCnt={post.likeCnt}
            disLikeCnt={post.disLikeCnt}
            createDateTime={post.createDateTime}
            hatecnt={post.hatecnt}
            commentcnt={post.commentcnt}
            avgPrice={post.avgPrice}
            reaction={post.reaction}
            recipeName={post.recipeName}
            toggleLike={() => toggleLike(index)} // 이 함수도 기존에 정의되어 있어야 합니다.
            postId={post.postId}///////////
          />
          
        ))}
      </div>
    </div>
  )
}


export default Timeline;
