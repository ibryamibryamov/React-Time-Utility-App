import { CircularProgress, Modal } from '@mui/material'
import StartIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/PauseRounded';
import StopIcon from '@mui/icons-material/StopRounded';
import ReplayIcon from '@mui/icons-material/ReplayRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/RemoveRounded';
import { useState, useEffect } from 'react';

const Timer = () => {

const MINUTES = 60;

const [duration, setDuration] = useState(1*MINUTES);
const [seconds, setSeconds] = useState(duration);
const [progress, setProgress] = useState(0);
const [isRunning, setIsRunning] = useState(false);
const [settingsModal, setSettingsModal] = useState(false);

useEffect(()=>{
let timer;

if (isRunning) {
  timer = setInterval(() => {
    if(seconds>=1){
      setSeconds((prevSeconds) => prevSeconds-1);
      setProgress(((duration - seconds) / duration) * 100);
    } else {
      setIsRunning(false);
      setSeconds(duration);
      setProgress(0);
    }
    
  }, 1000);
}

return () => {
  clearInterval(timer);
};

},[isRunning, seconds])

const handleStop = () => {
  setIsRunning(false);
  setSeconds(duration);
  setProgress(0);
}

const handleStartPause = () => {
setIsRunning((prevRunning) => !prevRunning);
}

const handleReset = () => {
  setSeconds(duration);
  setProgress(0);
}

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const toggleSettings = () => {
  setSettingsModal((prevValue) => !prevValue);
}

const incrementDuration = () => {
  setDuration((prevValue) => prevValue + 5);
  setSeconds(duration+5);
}

const decrementDuration = () => {
  if(duration>5){
    setDuration((prevValue) => prevValue - 5);
    setSeconds(duration-5);
  }
}


  return (
    <div className='timer'>
    <h2 className='timer__title'>Timer</h2>
    <div className='timer__circular-progress__container'>
    <CircularProgress 
      className='timer__circular-progress__container__circular-progress'
      variant='determinate'
      value={progress}
      size={220}
      thickness={1}
      sx={{color: '#06c3ff'}}
      />
      <h3 className='timer__circular-progress__container__timer-label'>{formatTime(seconds)}</h3>
      <button className={isRunning ? 'timer__circular-progress__container__settings-btn--hidden' : 'timer__circular-progress__container__settings-btn'} onClick={toggleSettings} disabled={isRunning ? true : false}><SettingsIcon/></button>
    </div>
    <div className='timer__btns-container'>
    <button 
      className={isRunning ? 'timer__btns-container__btn--secondary' : 'timer__btns-container__btn--secondary-hidden'} 
      onClick={handleStop}><StopIcon/></button>
       <button className='timer__btns-container__btn timer__btns-container__btn--primary' onClick={handleStartPause}>{isRunning ? <PauseIcon/> : <StartIcon/>}</button>
       <button 
      className={isRunning ? 'timer__btns-container__btn--secondary' : 'timer__btns-container__btn--secondary-hidden'} 
      onClick={handleReset}><ReplayIcon/></button>
    </div>
    <Modal 
    className='timer__modal'
    open={settingsModal}
    onClose={toggleSettings}
    >
      <div className='timer__modal__container'>
        <button className='timer__modal__container__close-btn' onClick={toggleSettings}><CloseIcon/></button>
        <h3 className='timer__modal__container__title'><SettingsIcon/> Settings</h3>
        <div className='timer__modal__container__controls'>
          <button className='timer__modal__container__controls__btn' onClick={incrementDuration}><AddIcon/></button>
          <span className='timer__modal__container__controls__span'>{formatTime(duration)}</span>
          <button className='timer__modal__container__controls__btn' onClick={decrementDuration}><RemoveIcon/></button>
        </div>
      </div>
    </Modal>
    </div>
  )
}

export default Timer