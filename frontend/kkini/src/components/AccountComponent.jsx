import React from 'react'

const AccountComponent = (props) => {
  const {검색어} = props

  return (
    <div>
      <div>계정 컴포넌트</div>
      <div>
        {
          [1, 1, 1, 1].map(user => (
            <div key={user.id}>
              <img src={user.profileImage} alt={user.name} />
              {user.name}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AccountComponent
