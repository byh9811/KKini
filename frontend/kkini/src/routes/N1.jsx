import React from 'react'
import "../components/Homepage.css"
import Timeline from '../components/Timeline'

function N1() {
  window.scrollTo(0, 0);
  
  return (
    <div className='homepage'>
      <div className='homepage__timeline'>
        <Timeline />
      </div>
    </div>
  )
}

export default N1;
