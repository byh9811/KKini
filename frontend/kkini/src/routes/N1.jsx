import React from 'react'
import "../components/Homepage.css"
import Timeline from '../components/Timeline'
import axios from 'axios'

function N1() {
  window.scrollTo(0, 0);
  
  return (
    <div className='homepage'>
      <div>
        <p>Hello, World!</p>
        <button onClick={()=>{
          axios.put('http://127.17.0.1/api/s3/test')
          .then((response)=>{
            console.log(response.data)
          })
          .catch(()=>{
            console.log('실패애애')
          })
        }}>버튼</button>
      </div>

      <div className='homepage__timeline'>
        <Timeline />
      </div>
    </div>
  )
}

export default N1;
