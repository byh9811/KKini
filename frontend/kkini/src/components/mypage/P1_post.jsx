import React from 'react';
import ReqUserPostCard from './ReqUserPostCard'

function P1_post() {
  window.scrollTo(0, 0);
  
  return (
    <div>
        <div>
            포스트!
        </div>
        <div className='flex flex-wrap'>
            {[1, 1, 1, 1, 1, 1].map((item, index)=><ReqUserPostCard key={index}></ReqUserPostCard>)}
        </div>
    </div>
  );
}

export default P1_post;
