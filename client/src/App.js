import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/register/Login';
import Signup from './Components/register/Signup';
import Dashboard from './Components/super_user/Dashboard';
import Competition from './Components/super_user/Competition';
import Add_Competition from './Components/super_user/Add_Competition';
import New_Team from './Components/user/New_Team';
import New_Players from './Components/user/New_Player';
import Profile from './Components/user/Profile';
import Notfound from './Components/Notfound';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admindashboard' element={<Dashboard />} />
          <Route path='/competition/:competition_id' element={<Competition />} />
          <Route path='/addcompetition' element={<Add_Competition />} />
          <Route path='/createteam/:user_id' element={<New_Team />} />
          <Route path='/newplayer/:user_id' element={<New_Players />} />
          <Route path='/profile/:type/:user_id' element={<Profile />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
