import React, { useState } from 'react';
import RecommendedFeed from './RecommendedFeed';

const Search = ({ onSearchChange }) => {

  let [검색어, 검색어변경] = useState("");

  const handleSearchChange = (e) => {
    검색어변경(e.target.value);
    onSearchChange(e.target.value);
  };

  // 검색어 초기화 함수
  const clearSearch = () => {
    검색어변경("");
    onSearchChange("");
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={검색어}
          onChange={handleSearchChange}
        />
        {검색어.trim() !== "" && (
          <button onClick={clearSearch}>x</button>
        )}
      </div>
      <div>
        {검색어.trim() === "" ? <RecommendedFeed /> : null}
      </div>
    </div>
  );
};

export default Search;
