import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Chronometer from './components/Chronometer';
import Timer from './components/Timer';
import NotFound from './components/NotFound';
import BottomNavBar from './components/BottomNavBar';
import Alarm from './components/Alarm';
import Clock from './components/Clock';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
        <Routes>
        <Route path='/' Component={Alarm}/>
        <Route path='/clock' Component={Clock}/>
        <Route path='/timer' Component={Timer}/>
        <Route path='/chronometer' Component={Chronometer}/>
        <Route path='*' Component={NotFound}/>
        </Routes>
        </div>
        <BottomNavBar/>
      </div>
    </Router>
  );
}

export default App;
