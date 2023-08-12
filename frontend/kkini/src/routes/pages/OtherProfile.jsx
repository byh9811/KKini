import React from 'react';
import { ProfileUserDetails } from '../../components/mypage/ProfileUserDetails';
import ReqUserPostPart from '../../components/mypage/ReqUserPostPart';


//MY PAGE
function OtherProfile() {
  window.scrollTo(0, 0);

  return (
    <div>
      {/* 프로필 */}
      <div className='w-full'>
        <div className=''>        
          <ProfileUserDetails 내것 = {0}></ProfileUserDetails>
        </div>
        <div>
          <ReqUserPostPart></ReqUserPostPart>
        </div>
      </div>
    </div>
  );
}

export default OtherProfile;