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
import RoomListFromAdd from './components/pageStaff/roomList-page/addTenant/roomListFromAdd.tsx';
import RoomListPageDetail from './components/pageStaff/roomList-page/addTenant/roomlistPageDetail.tsx';

import BillPage from './components/pageStaff/bill-page/billPage';
import DashBoardPage from './components/pageStaff/dashboard-page/dashboard';
import AnouncePage from './components/pageStaff/annouce-page/annoncePage';

import ReportStatePage from './components/pageStaff/annouce-page/subtabannouce/reportState.tsx/reportStatepage.tsx';

import PacketPage from './components/pageStaff/packet-page/packetPage';

import YourBillPage from './components/pageRentel/yourBill-page/yourBillPage';
import ReportPage from './components/pageRentel/report-page/report';
import YourpacketPage from './components/pageRentel/yourPacket-page/yourPacket';

import RentPage from './components/pageAdmin/rent-page/rentPage';
import ManageUserPage from './components/pageAdmin/manageUser-page/manageUserPage';
import ManageUserDetail from './components/pageAdmin/manageUser-page/manageUserDetail.tsx';
import PermissionPage from './components/pageAdmin/permission-page/permissionPage';
import PermissionSetting from './components/pageAdmin/permission-page/permissionSetting.tsx';

import SettingPage from './components/pageAdmin/setting-Page/settingPage';
import ForgetPassword from './components/fotgetPassword/forgetPassword.tsx';
import ChangePassword from './components/changePassword/changePassword.tsx';
import CreatePassword from './components/createPassword/createPassword.tsx';

import TestUpload from './components/pageStaff/roomList-page/addTenant/roomlistformadd1-4/testUpload.tsx';
import ServiceRoomSetting from './components/pageAdmin/setting-Page/ServiceRoomSetting.tsx';
import WaterElecPage from './components/pageStaff/water-elec-page/WaterElecPage.tsx';
import ManageUserAdd from './components/pageAdmin/manageUser-page/manageUserAdd.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpw" element={<ForgetPassword/>} />
        <Route path="/changepw" element={<ChangePassword/>} />
        <Route path="/createpw" element={<CreatePassword/>} />

         
        <Route path="/home" element={<Navbar component={<HomePage />} title={"หน้าหลัก"} />} />

        <Route path="/roomlist" element={<Navbar component={<RoomListPage />} title={"รายการห้องเช่า"} />} />
        <Route path="/roomlist/from" element={<Navbar component={<RoomListFromAdd />} title={"เพิ่มผู้เช่า"} />} />
        <Route path="/roomlist/detail" element={<Navbar component={<RoomListPageDetail />} title={"รายละเอียดผู้เช่า"} />} />
        <Route path="/bill" element={<Navbar component={<BillPage/>} title={"ใบแจ้งหนี้"} />} />
        <Route path="/dashboard" element={<Navbar component={<DashBoardPage />} title={"กระดานสรุปรายงานผล"}/>} />
        <Route path="/anouncn" element={<Navbar component={<AnouncePage />} title={"จัดการประกาศและคำร้อง"}/>} />
        <Route path="/anouncn/reportstate" element={<Navbar component={<ReportStatePage />} title={"สถานะการแก้ไข"}/>} />
        <Route path="/packet" element={<Navbar component={<PacketPage />} title={"แจ้งเตือนพัสดุและยืนยัน"}/>} />
        
        <Route path="/yourBill" element={<Navbar component={<YourBillPage />} title={"ใบแจ้งหนี้ของคุณ"}/>} />
        <Route path="/report" element={<Navbar component={<ReportPage />} title={"แจ้งปัญหา"}/>} />
        <Route path="/yourPacket" element={<Navbar component={<YourpacketPage />} title={"พัสดุของคุณ"}/>} />
        
        <Route path="/create-apartment" element={<Navbar component={<RentPage />} title={"สร้างหอพัก"} />} />
        <Route path="/manageUser" element={<Navbar component={<ManageUserPage />} title={"การจัดการผู้ใช้"} />} />
        <Route path="/manageUser/detail" element={<Navbar component={<ManageUserDetail />} title={"รายละเอียดผู้ใช้"} />} />
        <Route path="/permission" element={<Navbar component={<PermissionPage />} title={"ตั้งค่าสิทธิ์การเข้าใช้งาน"} />} />
        <Route path="/permission/detail" element={<Navbar component={<PermissionSetting />} title={"รายละเอียดสิทธิ์การเข้าใช้งาน"} />} />
        <Route path="/setting" element={<Navbar component={<SettingPage />} title={"ตั้งค่าค่าใช้จ่าย"} />} />


        <Route path="/apartment/:apartId/roomlist/:roomId/form" element={<Navbar component={<RoomListFromAdd />} title={"เพิ่มผู้เช่า"} />} />
        <Route path="/apartment/:apartId/roomlist/:roomId/detail" element={<Navbar component={<RoomListPageDetail />} title={"รายละเอียดผู้เช่า"} />} />
        <Route path="/apartment/:apartId/roomlist" element={<Navbar component={<RoomListPage />} title={"รายการห้องเช่า"} />} />


        <Route path="/apartment/:apartId/home" element={<Navbar component={<HomePage />} title={"หน้าหลัก"} />} />

        <Route path="/apartment/:apartId/roomlist" element={<Navbar component={<RoomListPage />} title={"รายการห้องเช่า"} />} />
        <Route path="/apartment/:apartId/bill" element={<Navbar component={<BillPage/>} title={"ใบแจ้งหนี้"} />} />
        <Route path="/apartment/:apartId/dashboard" element={<Navbar component={<DashBoardPage />} title={"กระดานสรุปรายงานผล"}/>} />'
        <Route path="/apartment/:apartId/anouncn" element={<Navbar component={<AnouncePage />} title={"จัดการประกาศและคำร้อง"}/>} />
        <Route path="/apartment/:apartId/packet" element={<Navbar component={<PacketPage />} title={"แจ้งเตือนพัสดุและยืนยัน"}/>} />

        <Route path="/apartment/:apartId/yourBill" element={<Navbar component={<YourBillPage />} title={"ใบแจ้งหนี้ของคุณ"}/>} />
        <Route path="/apartment/:apartId/report" element={<Navbar component={<ReportPage />} title={"แจ้งปัญหา"}/>} />
        <Route path="/apartment/:apartId/yourPacket" element={<Navbar component={<YourpacketPage />} title={"พัสดุของคุณ"}/>} />


        <Route path="/apartment/:apartId/manageUser/add" element={<Navbar component={<ManageUserAdd />} title={"เพิ่มผู้ใช้"} />} />
        <Route path="/apartment/:apartId/manageUser/:userId/detail" element={<Navbar component={<ManageUserDetail />} title={"รายละเอียดผู้ใช้"} />} />
        <Route path="/apartment/:apartId/create-apartment" element={<Navbar component={<RentPage />} title={"สร้างหอพัก"} />} />
        <Route path="/apartment/:apartId/manageUser" element={<Navbar component={<ManageUserPage />} title={"การจัดการผู้ใช้"} />} />
        <Route path="/apartment/:apartId/permission" element={<Navbar component={<PermissionPage />} title={"ตั้งค่าสิทธิ์การเข้าใช้งาน"} />} />
        <Route path="/apartment/:apartId/setting" element={<Navbar component={<SettingPage />} title={"ตั้งค่าค่าใช้จ่าย"} />} />
        <Route path="/apartment/:apartId/services/:serviceId" element={<Navbar component={<ServiceRoomSetting />} title={"ตั้งค่าค่าใช้จ่าย"} />} />
        <Route path='/apartment/:apartId/waterElec' element={<Navbar component={<WaterElecPage />} title={"กรอกค่าน้ำค่าไฟ"} />} />
        <Route path="/test" element={<TestUpload />} />

      </Routes>
    </Router>
    {
      // localStorage.getItem('user') ? <Navbar /> : <Navbar />
    }
  </React.StrictMode>,
)