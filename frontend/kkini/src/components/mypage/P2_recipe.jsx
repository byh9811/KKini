import React from 'react';
import ReqUserPostCard from './ReqUserPostCard'

function P2() {
  window.scrollTo(0, 0);
  
  return (
    <div>
        <div>
            레시피!
        </div>
        <div className='flex flex-wrap'>
            {[1, 1, 1, 1, 1, 1].map((item)=><ReqUserPostCard></ReqUserPostCard>)}
        </div>
    </div>
    
  );
}

export default P2;
