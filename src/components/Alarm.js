import AddIcon from '@mui/icons-material/AddRounded';
import AlarmItem from './AlarmItem';
import { Modal } from '@mui/material';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/RemoveRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'

const Alarm = () => {
const MINUTES = 60;
const HOURS = MINUTES * 60;

const [addModalOn, setAddModalOn] = useState(false);
const [time, setTime] = useState(12*HOURS + 0*MINUTES);
const [alarms, setAlarms] = useState([]);

const toggleAddModal = () => {
  setAddModalOn((prevValue) => !prevValue);
}

const incrementTime = () => {
if(time===23 * HOURS+ 55*MINUTES){
setTime(0);
} else if (time !== 23 * HOURS + 55 * MINUTES) {
  setTime(prevValue => prevValue + 5*MINUTES);
}
}

const decrementTime = () => {
if(time===0){
  setTime(23 * HOURS + 55 * MINUTES)
} else if (time !==0 * HOURS + 0 * MINUTES){
  setTime(prevValue => prevValue - 5 * MINUTES);
}
}

const handleAddAlarm = () => {
if(alarms.includes(time)===false){
const updatedAlarms = [...alarms, time];
setAlarms(updatedAlarms);
toggleAddModal();
}
}

const handleEditAlarm = (oldValue, newValue) => {
  if(alarms.includes(newValue)===false){
    let addNewValue = [...alarms, newValue];
    let removeOldValue = addNewValue.filter(alarm => alarm !== oldValue);
    setAlarms(removeOldValue);
  }
}

const handleDeleteAlarm = (target) => {
const updatedAlarms = alarms.filter(alarm => alarm !== target);
setAlarms(updatedAlarms);
}

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

  return (
    <div className='alarm'>
      <h2 className='alarm__title'>Alarm</h2>
      <button className='alarm__add-btn' onClick={toggleAddModal}><AddIcon/></button>
      <div className='alarm__scrollable-container'>
      {
        alarms.map((alarm, index)=>(
          <AlarmItem time={alarm} key={index} delete={handleDeleteAlarm} edit={handleEditAlarm}/>
        ))
      }
      </div>
      <Modal 
      className='alarm__add-modal'
      open={addModalOn}
      onClose={toggleAddModal}
      >
        <div className='alarm__add-modal__container'>
        <button className='alarm__add-modal__container__close-btn' onClick={toggleAddModal}><CloseIcon/></button>
        <button className='alarm__add-modal__container__btn' onClick={incrementTime}><AddIcon/></button>  
         <span className='alarm__add-modal__container__span'>{formatTime(time)}</span>
         <button className='alarm__add-modal__container__btn' onClick={decrementTime}><RemoveIcon/></button> 
         <button className='alarm__add-modal__container__submit-btn' onClick={handleAddAlarm}>Add</button>         
        </div>
      </Modal>
    </div>
  )
}

export default Alarm