import React, { useState, useRef } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const historyRef = useRef(null);

  const handleSearch = () => {
    setSearchHistory([query, ...searchHistory]);
    onSearch(query);
    setQuery('');
  };

  const handleDeleteHistory = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  const handleBlur = (e) => {
    if (historyRef.current && !historyRef.current.contains(e.relatedTarget)) {
      setShowHistory(false);
    }
  };

  return (
    <div onBlur={handleBlur}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setShowHistory(true)}
      />
      <button onClick={handleSearch}>검색</button>
      {showHistory && (
        <div ref={historyRef}>
          <h4>최근 검색 내역</h4>
          {searchHistory.map((item, index) => (
            <div key={index}>
              <span>{item}</span>
              <button onClick={() => handleDeleteHistory(index)}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
