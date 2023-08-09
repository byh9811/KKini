import React, { useState } from 'react'
import Drawer2 from './Drawer2';
import { CiSettings } from 'react-icons/ci'
import { useNavigate, useParams } from 'react-router-dom'

export const ProfileUserDetails = () => {
    const navigate = useNavigate();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);  // 설정 드로워

    //  팔로우
  const { memberId } = useParams();
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  // useEffect(() => {
  //   fetchFollowingList();
  //   fetchFollowerList();
  // }, [memberId]);

  // const fetchFollowingList = async () => {
  //   const response = await axios.get(`/api/follow/follow/${memberId}`);
  //   if (response.data.success) {
  //     setFollowingList(response.data.response);
  //     setIsFollowing(response.data.response.some(user => user['회원 식별자'] === Number(memberId)));
  //   } else {
  //     console.error(response.data.error.message);
  //   }
  // };

  // const fetchFollowerList = async () => {
  //   const response = await axios.get(`/api/follow/follower/${memberId}`);
  //   if (response.data.success) {
  //     setFollowerList(response.data.response);
  //   } else {
  //     console.error(response.data.error.message);
  //   }
  // };

  // const handleFollow = async () => {
  //   const response = await axios.post(`/api/follow/${memberId}`);
  //   if (response.data.success) {
  //     fetchFollowingList();
  //     fetchFollowerList();
  //   } else {
  //     console.error(response.data.error.message);
  //   }
  // };

  // const handleUnfollow = async () => {
  //   const response = await axios.delete(`/api/follow/${memberId}`);
  //   if (response.data.success) {
  //     fetchFollowingList();
  //     fetchFollowerList();
  //   } else {
  //     console.error(response.data.error.message);
  //   }
  // };

    return (
        <div>
            <div className='py-10 w-full'>
                <div className='flex items-center'>
                    <div className='w-[15%]'>
                        <img 
                        className='w-32 h-32 rounded-full'
                        src="https://newsimg.sedaily.com/2023/04/04/29O67TZ4DD_1.jpg" 
                        alt="" 
                        />
                    </div>

                    <div className='space-y-5 text-xs'>
                        <div className='flex space-x-10 items-center'>
                            <p className='font-semibold'>username</p>
                            <button>follow</button>
                            <Drawer2 isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
                            <CiSettings size={20} onClick={() => setIsDrawerOpen(true)}></CiSettings>
                        </div>
                        <div className='flex space-x-10'>
                            <div>
                                <span className='font-semibold mr-2'>5</span>
                                <span onClick={() => {navigate('/followlist')}}>follower</span>
                            </div>
                            <div>
                                <span className='font-semibold mr-2'>7</span>
                                <span onClick={() => {navigate('/followlist')}}>following</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* 팔로우 */}
        {/* <div className="follow">
          <button onClick={isFollowing ? handleUnfollow : handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button> */}
          
          {/* 리스트들은 어케 보여줄지 수정*/}
          {/* <h2>Following List</h2>
          {followingList.map(user => <p key={user['식별자']}>{user['닉네임']}</p>)}
          <h2>Follower List</h2>
          {followerList.map(user => <p key={user['식별자']}>{user['닉네임']}</p>)} */}
        {/* </div>         */}
        </div>
    )
}

// const FollowButton = ({ isFollowing, onFollow }) => {
//   return (
//     <button onClick={onFollow}>
//       {isFollowing ? 'Unfollow' : 'Follow'}
//     </button>
//   );
// };