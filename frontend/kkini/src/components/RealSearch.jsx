import React from 'react';
import SearchBar from './SearchBar';

function RealSearch() {
  const [userResults, setUserResults] = React.useState([]);
  const [contentResults, setContentResults] = React.useState([]);

  const handleSearch = query => {
    // 검색 로직 구현 및 결과 업데이트
    // 예를 들어 사용자 이름 결과와 관련 내용 결과를 별도로 설정
    // setUserResults(receivedUserData);
    // setContentResults(receivedContentData);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div>
        <h2>사용자 이름 검색 결과</h2>
        {userResults.map(user => (
          <div key={user.id}>
            <img src={user.profileImage} alt={user.name} />
            {user.name}
          </div>
        ))}
      </div>
      <div>
        <h2>관련 내용 검색 결과</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {contentResults.map(content => (
            <div key={content.id} style={{ width: '50%' }}>
              <img src={content.image} alt={content.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RealSearch;
