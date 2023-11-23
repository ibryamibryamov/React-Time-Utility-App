import { CircularProgress } from '@mui/material'
import StartIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/PauseRounded';
import StopIcon from '@mui/icons-material/StopRounded';
import ReplayIcon from '@mui/icons-material/ReplayRounded';
import { useState, useEffect } from 'react';

const Chronometer = () => {

const [seconds, setSeconds] = useState(0);
const [isRunning, setIsRunning] = useState(false);

useEffect(()=>{
let timer;

if(isRunning){
  timer = setInterval(()=>{
  setSeconds((prevSeconds) => prevSeconds + 1);
  },1000)
}

return () => {
  clearInterval(timer);
};

},[isRunning]);

const handleStartPause = () => {
setIsRunning(prevRunning=>!prevRunning);
}

const handleStop = () => {
setIsRunning(false);
setSeconds(0);
}

const handleReset = () => {
setSeconds(0);
}

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

  return (
    <div className='chronometer'>
    <h2 className='chronometer__title'>Chronometer</h2>
    <div className='chronometer__circular-progress__container'>
      <CircularProgress 
      className='chronometer__circular-progress__container__circular-progress'
      variant='determinate'
      value={(seconds / 60) * 100}
      size={220}
      thickness={1}
      sx={{color: '#06c3ff'}}
      />
      <h3 className='chronometer__circular-progress__container__timer-label'>{formatTime(seconds)}</h3>
    </div>
    <div className='chronometer__btns-container'>
      <button 
      className={isRunning ? 'chronometer__btns-container__btn--secondary' : 'chronometer__btns-container__btn--secondary-hidden'} 
      onClick={handleStop}><StopIcon/></button>
      <button className='chronometer__btns-container__btn chronometer__btns-container__btn--primary' onClick={handleStartPause}>{isRunning ? <PauseIcon/> : <StartIcon/>}</button>
      <button 
      className={isRunning ? 'chronometer__btns-container__btn--secondary' : 'chronometer__btns-container__btn--secondary-hidden'} 
      onClick={handleReset}><ReplayIcon/></button>
    </div>
    </div>
  )
}

export default Chronometer