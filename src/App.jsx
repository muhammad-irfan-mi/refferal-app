import './App.css';
import Signup from './Pages/Authentiction/Signup';
import Login from './Pages/Authentiction/Login';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import './assets/style/navbar.css';
import Home from './Pages/Home/Home';
import Wallet from './Pages/Wallet/Wallet';
import Ledger from './Pages/Ledger/Ledger';
import Profile from './Pages/profile/Profile';
import Task from './Pages/task/Task';
import Block from './component/Block';
import NoData from './component/NoData';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from './context/Global';
import ForgetPassword from './Pages/Authentiction/ForgetPassword';
import ResetPassword from './Pages/Authentiction/ResetPassword';
import { BACK_URL } from '../ENV'

function App() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const global = useContext(GlobalContext);



  const getUser = async (token) => {
    try {
      const response = await axios.get(`${BACK_URL}/api/check-user`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUserId(response.data.userId);
      }
      // else if(location.pathname === '/' || location.pathname === 'signup'){
      //   setLoading(false)
      // } 
    } catch (err) {
      console.error("Error finding userId", err);
    }
  };

  const getUserById = async () => {
    const token = localStorage.getItem('authToken');
    if (!token || !userId) return;

    try {
      const response = await axios.get(`${BACK_URL}/api/getUser/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        global.setGlobal(response.data);
        setLoading(false);
      }
      // else if(location.pathname === '/' && location.pathname === 'signup'){
      //   setLoading(false)
      // } 
      else {
        setLoading(true)
      }
    } catch (err) {
      console.error("Error fetching user data", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      getUser(token);
    }
    // else if(location.pathname === '/' && location.pathname === 'signup'){
    //   setLoading(false)
    // } 
    else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getUserById();
    }
  }, [userId]);

  return (
    <Router>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Content />
      )}
    </Router>
  );
}




function Content() {
  const token = localStorage.getItem('authToken');
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' &&
        location.pathname !== '/login' &&
        location.pathname !== '/forget' &&
        location.pathname !== '/reset' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/block' && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget' element={<ForgetPassword />} />
        <Route path='/reset' element={<ResetPassword />} />
        <Route path='/block' element={<Block />} />
        <Route path='/*' element={<NoData />} />

        {/* Private Routes */}
        <Route path='/home' element={token ? <Home /> : <Navigate to="/" />} />
        <Route path='/ledger' element={token ? <Ledger /> : <Navigate to="/" />} />
        <Route path='/wallet' element={token ? <Wallet /> : <Navigate to="/" />} />
        <Route path='/task' element={token ? <Task /> : <Navigate to="/" />} />
        <Route path='/profile' element={token ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
