import React from 'react';
import { useInView } from "react-intersection-observer";

function SearchResults({ results }) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView) {
      // TODO: 다음 이미지 세트 로드
    }
  }, [inView]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {results.map((result, index) => (
        <div key={index} style={{ flex: '50%', padding: '5px' }}>
          <img src={result.postImage} alt="" style={{ width: '100%' }} />
        </div>
      ))}
      <div ref={ref}></div>
    </div>
  );
}

export default SearchResults;
