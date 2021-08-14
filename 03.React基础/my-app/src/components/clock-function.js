import React, { useState, useEffect } from 'react';
export default function ClockFunction(props) {
  const [date,setDate] = useState(new Date());
  useEffect(()=>{
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000);
    return () => clearInterval(timer)
  },[])
  return (
    <div>
      <h3>ClockFunction</h3>
      <p>{date.toLocaleTimeString()}</p>
    </div>
  )
}

