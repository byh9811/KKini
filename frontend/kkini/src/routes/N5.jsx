import React from 'react';
import { ProfileUserDetails } from '../components/ProfileUserDetails';
import ReqUserPostPart from '../components/ReqUserPostPart';


//MY PAGE
function N5() {
  window.scrollTo(0, 0);

  return (
    <div>
      {/* 프로필 */}
      <div className='w-full'>
        <div className=''>        
          <ProfileUserDetails 내것 = {1}></ProfileUserDetails>
        </div>
        <div>
          <ReqUserPostPart></ReqUserPostPart>
        </div>
      </div>
    </div>
  );
}

export default N5;