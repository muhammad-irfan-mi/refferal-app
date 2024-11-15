// import React from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import Navbar from '../component/Navbar';
// import Signup from '../Pages/Authentiction/Signup';
// import Login from '../Pages/Authentiction/Login';
// import Home from '../Pages/Home/Home';
// import Wallet from '../Pages/Wallet/Wallet';
// import Ledger from '../Pages/Ledger/Ledger';
// import Profile from '../Pages/profile/Profile';
// import Task from '../Pages/task/Task';
// import Block from '../component/Block';
// // import './assets/style/navbar.css';

// function Index() {
//   const location = useLocation();

//   return (
//     <>
//       {/* Conditionally render Navbar */}
//       {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/block' && <Navbar />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path='/login' element={<Login />} />
//         <Route path='/signup' element={<Signup />} />

//         {/* Private Routes */}
//         <Route path='/home' element={<Home />} />
//         <Route path='/ledger' element={<Ledger />} />
//         <Route path='/wallet' element={<Wallet />} />
//         <Route path='/task' element={<Task />} />
//         <Route path='/profile' element={<Profile />} />
//         <Route path='/block' element={<Block />} />
//       </Routes>
//     </>
//   );
// }

// export default Index;
