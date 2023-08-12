import React from 'react';
import { ProfileUserDetails } from '../../components/mypage/ProfileUserDetails';
import ReqUserPostPart from '../../components/mypage/ReqUserPostPart';

function N5_mypage() {
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

export default N5_mypage;
