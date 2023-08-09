import React from 'react'

const FeedComponent = ({검색어, 카테고리}) => {
  // const {검색어} = props
  // const allFeeds = [모든 피드 데이터];
  
  // const filteredFeeds = allFeeds.filter(feed => feed.title.includes(검색어) && 
  //   (카테고리 === "" || feed.category === 카테고리)
  // );

  return (
    <div>
      <div>피드 컴포넌트</div>
      <div>{카테고리}</div>
      {/* {filteredFeeds.map(feed => (
        <div key={feed.id}>{feed.title}</div>
      ))} */}
    </div>
  )
}

export default FeedComponent
