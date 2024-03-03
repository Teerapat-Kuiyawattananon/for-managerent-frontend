import React, { useState } from 'react';
// import ReportTable from './reportTable';
import ManageUserTable from './manageUserTable';
import { Button , Modal , Form, Input, } from 'antd';
// import './allAnnounce.css';
import { Link } from 'react-router-dom';

const data = [
    {
        key: '1',
        roleName: 'Admins',
        roomName: "-",
        name: 'ธนกฤต วงศ์คำจันทร์',
        email: 'thanakrit.w@ku.th',
    },
    {
        key: '2',
        roleName: 'Staff',
        roomName: "-",
        name: 'นางกบ กบ',
        email: 'kob.k@ku.th',
    },
    {
        key: '3',
        roleName: 'Renters',
        roomName: "101",
        name: 'เกบ กาบ',
        email: 'kab.karb@ku.th',
    },
    {
        key: '4',
        roleName: 'Renters',
        roomName: "102",
        name: 'เกบ กาบ',
        email: 'kab.karb@ku.th',
    },
    {
        key: '5',
        roleName: 'Renters',
        roomName: "103",
        name: 'เกบ กาบ',
        email: 'kab.karb@ku.th',
    },
    {
        key: '6',
        roleName: 'Renters',
        roomName: "104",
        name: 'เกบ กาบ',
        email: 'kab.karb@ku.th',
    },
    
  ];

const ManageUserPage: React.FC = () => {
    
      return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px"}}>
                    < Link to= "/manageUser/detail"> 
                        <Button type="primary">
                            เพิ่มผู้ใช้
                         </Button>
                    </Link>
            </div>
           
            <ManageUserTable data={data}/>
            {/* เนื้อหาหน้าหลัก */}
        </div>
    );
};

export default ManageUserPage;