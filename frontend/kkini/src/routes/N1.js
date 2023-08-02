import React from 'react'
// import "./Homepage.css"
import "../components/Homepage.css"
// import Timeline from '../components/timeline/Timeline'
// 컴포넌트로 옮긴 타임라인을 가져와야함
import Timeline from '../components/Timeline'



function Homepage() {
  return (
    <div className='homepage'>
      <div className='homepage__timeline'>
        <Timeline />
      </div>
    </div>
  )
}



export default Homepage
