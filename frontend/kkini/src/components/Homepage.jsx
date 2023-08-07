import React from 'react'
import "./Homepage.css"
import Timeline from './Timeline'

function Homepage() {
  return (
    <div className='homepage'>
      <div className='homepage__timeline'>
        <Timeline />
      </div>
    </div>
  )
}

export default Homepage;