// import React from 'react'
// import ReactDOM from 'react-dom'
// import Navbar from './navbar.tsx'
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from './components/login/Login.tsx';
// import Register from './components/register/Register.tsx'
// import './index.css'


// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         {/* <Route path="/test" element={<Navbar />} /> */}
//       </Routes>
//     </Router>
    
//   </React.StrictMode>,
//   document.getElementById('root')
// )

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Navbar />
//   </React.StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './navbar.tsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/login/Login.tsx';
import Register from './components/register/Register.tsx'
import './index.css'

// Import หน้าต่างๆ

import HomePage from './components/pageStaff/home-page/homePage';
import RoomListPage from './components/pageStaff/roomList-page/roomListPage';
import BillPage from './components/pageStaff/bill-page/billPage';
import DashBoardPage from './components/pageStaff/dashboard-page/dashboard';
import AnouncePage from './components/pageStaff/annouce-page/annoncePage';
import PacketPage from './components/pageStaff/packet-page/packetPage';

import YourBillPage from './components/pageRentel/yourBill-page/yourBillPage';
import ReportPage from './components/pageRentel/report-page/report';
import YourpacketPage from './components/pageRentel/yourPacket-page/yourPacket';

import RentPage from './components/pageAdmin/rent-page/rentPage';
import ManageUserPage from './components/pageAdmin/manageUser-page/manageUserPage';
import PermissionPage from './components/pageAdmin/permission-page/permissionPage';
import SettingPage from './components/pageAdmin/setting-Page/settingPage';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Navbar component={<DashBoardPage />} title={"กระดานสรุปรายงานผล"}/>} />
        <Route path="/home" element={<Navbar component={<HomePage />} title={"หน้าหลัก"} />} />
      <Route path="/create-apartment" element={<Navbar component={<RentPage />} title={"สร้างหอพัก"} />} />
      </Routes>
    </Router>
    {
      // localStorage.getItem('user') ? <Navbar /> : <Navbar />
    }
  </React.StrictMode>,
)