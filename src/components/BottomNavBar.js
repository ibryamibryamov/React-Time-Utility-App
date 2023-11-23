import { NavLink } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ClockIcon from '@mui/icons-material/QueryBuilder';
import AlarmIcon from '@mui/icons-material/AccessAlarm';
import { Height } from '@mui/icons-material';

const BottomNavBar = () => {
  return (
    <div className='bottom-nav-bar'>
       <NavLink
    to='/'
    className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      color: isActive ? '#06c3ff' : '#d3d3d3',
      backgroundColor: isActive ? '#c2f1ff' : '#ffffff',
      height: '100%',
      width: '25%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }}
    ><AlarmIcon/></NavLink>
     <NavLink
    to='/clock'
    className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      color: isActive ? '#06c3ff' : '#d3d3d3',
      backgroundColor: isActive ? '#c2f1ff' : '#ffffff',
      height: '100%',
      width: '25%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }}
    ><ClockIcon/></NavLink>
    <NavLink
    to='/timer'
    className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      color: isActive ? '#06c3ff' : '#d3d3d3',
      backgroundColor: isActive ? '#c2f1ff' : '#ffffff',
      height: '100%',
      width: '25%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }}
    ><HourglassTopIcon/></NavLink>
    <NavLink
    to='/chronometer'
    className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      color: isActive ? '#06c3ff' : '#d3d3d3',
      backgroundColor: isActive ? '#c2f1ff' : '#ffffff',
      height: '100%',
      width: '25%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    };
  }}
    ><TimerIcon/></NavLink>
    </div>
  )
}

export default BottomNavBar