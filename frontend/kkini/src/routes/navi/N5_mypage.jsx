import React from 'react';
import { ProfileUserDetails } from '../../components/mypage/ProfileUserDetails';
import ReqUserPostPart from '../../components/mypage/ReqUserPostPart';


//MY PAGE
function N5() {
  window.scrollTo(0, 0);

  return (
    <div style={{height: 'calc(var(--vh, 1vh) * 100)'}}>
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