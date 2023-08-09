import React from 'react'
import Timeline from '../components/Timeline'
import axios from 'axios'

function N1() {
  window.scrollTo(0, 0);
  
  return (
    <div className='homepage'>
      <div>
        {/* <button onClick={()=>{
          axios.put('http://localhost:8080/api/s3/test')
          .then((response)=>{
            console.log(response.data)
          })
          .catch(()=>{
            console.log('실패애애')
          })
        }}>버튼</button> */}
      </div>

      <div className='homepage__timeline'>
        <Timeline />
      </div>
    </div>
  )
}

export default N1;
