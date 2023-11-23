import { Modal, Popover, Switch } from "@mui/material"
import { useState, useEffect } from "react"
import MenuIcon from '@mui/icons-material/MoreVertRounded';
import DeleteIcon from '@mui/icons-material/DeleteForeverRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/RemoveRounded'
import AlarmSound from '../assets/sounds/alarm_sound.mp3';

const AlarmItem = (props) => {
const MINUTES = 60;
const HOURS = MINUTES * 60;

const [checked, setChecked] = useState(true);
const [anchorEl, setAnchorEl] = useState(null);
const [editModalOn, setEditModalOn] = useState(false);
const [newValue, setNewValue] = useState(props.time);
const [audio, setAudio] = useState(new Audio(AlarmSound));
const [snoozeModalOn, setSnoozeModalOn] = useState(false);
const [snoozeInput, setSnoozeInput] = useState('');
const [isAlarmActive, setIsAlarmActive] = useState(false);

const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

const handlePopover = (event) => {
setAnchorEl(event.currentTarget);
}

const handleClosePopover = () => {
  setAnchorEl(null);
}

const handleSwitch = () => {
    setChecked((prevValue)=> !prevValue);
}

const handleEditModal = () => {
  setEditModalOn(prevValue=>!prevValue);
  handleClosePopover();
}

const handleEdit = () => {
props.edit(props.time, newValue);
setChecked(true);
handleClosePopover();
setEditModalOn(false);
setSnoozeInput('');
audio.currentTime=0;
}

const handleDelete = () => {
props.delete(props.time);
handleClosePopover();
}

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const incrementTime = () => {
  if(newValue===23 * HOURS+ 55*MINUTES){
    setNewValue(0);
    } else if (newValue !== 23 * HOURS + 55 * MINUTES) {
      setNewValue(prevValue => prevValue + 5*MINUTES);
    }
}

const decrementTime = () => {
  if(newValue===0){
    setNewValue(23 * HOURS + 55 * MINUTES)
  } else if (newValue !==0 * HOURS + 0 * MINUTES){
    setNewValue(prevValue => prevValue - 5 * MINUTES);
  }
}


const handleSnoozeInput = (event) => {
  setSnoozeInput(event.target.value);
}



useEffect(()=>{
const alarmInterval = setInterval(()=>{
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();

const currentMinutes = hours * HOURS + minutes * MINUTES;

if(checked && props.time === currentMinutes){
  setSnoozeModalOn(true);
  audio.loop=true;
  audio.play();
  
}

if(snoozeInput==='I am awake'){
  setSnoozeModalOn(false);
  audio.pause();
}

},1000);

return () => clearInterval(alarmInterval);


},[props.time, checked, snoozeInput])


  return (
    <div className='alarm-item'>
        <h2 className="alarm-item__time">{formatTime(props.time)}</h2>
        <Switch className="alarm-item__switch" checked={checked} onChange={handleSwitch} sx={{color: '#06c3ff'}}/>
        <button className="alarm-item__menu-btn" onClick={handlePopover}><MenuIcon/></button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        
        onClose={handleClosePopover}
        >
          <div className="alarm-item__popover">
          <button className="alarm-item__popover__edit-btn" onClick={handleEditModal}><EditIcon/></button>
          <button className="alarm-item__popover__delete-btn" onClick={handleDelete}><DeleteIcon/></button>
          </div></Popover>
          <Modal 
          className="alarm-item__edit-modal"
          open={editModalOn}
          onClose={handleEditModal}
          >
            <div className="alarm-item__edit-modal__container">
              <button className="alarm-item__edit-modal__container__close-btn" onClick={handleEditModal}><CloseIcon/></button>
              <button className="alarm-item__edit-modal__container__increment-btn" onClick={incrementTime}><AddIcon/></button>
              <span className="alarm-item__edit-modal__container__span">{formatTime(newValue)}</span>
              <button className="alarm-item__edit-modal__container__decrement-btn" onClick={decrementTime}><RemoveIcon/></button>
              <button className="alarm-item__edit-modal__container__submit-btn" onClick={handleEdit}>Edit</button>
            </div>
          </Modal>
          <Modal 
          className="alarm-item__snooze-modal"
          open={snoozeModalOn}
          >
            <div className="alarm-item__snooze-modal__container">
              <label className="alarm-item__snooze-modal__container__label">To snooze please type "I am awake"</label>
              <input className="alarm-item__snooze-modal__container__input" onChange={handleSnoozeInput}/>
            </div>
          </Modal>
    </div>
  )
}

export default AlarmItem