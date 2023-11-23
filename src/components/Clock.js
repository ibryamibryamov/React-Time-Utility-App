import { useState, useEffect } from "react";


const Clock = () => {

const [time, setTime] = useState();

const getFormattedTime = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2,'0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

useEffect(()=>{
const interval = setInterval(()=>{
  setTime(getFormattedTime());
}, 1000);

return () => clearInterval(interval);

},[]);

  return (
    <div className='clock'>
      <h2 className='clock__title'>Clock</h2>
      <div className='clock__container'>
        <h3 className='clock__container__time-label'>{time}</h3>
      </div>
    </div>
  )
}

export default Clock