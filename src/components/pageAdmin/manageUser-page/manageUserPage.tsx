import React, { useState } from 'react';
// import ReportTable from './reportTable';
import ManageUserTable from './manageUserTable';
import { Button , Modal , Form, Input, } from 'antd';
// import './allAnnounce.css';
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
      return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px"}}>
                <Button type="primary" onClick={showModal} >
                    เพิ่มค่าใช้จ่าย
                </Button>
            </div>
            <Modal title="ค่าใช้จ่ายเพิ่มเติม" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                    <Form.Item name="ชื่อค่าใช้จ่ายเพิ่มเติม" label="ชื่อค่าใช้จ่ายเพิ่มเติม" rules={[{ required: true }]}>
                        <Input 
                            name='ชื่อค่าใช้จ่ายเพิ่มเติม'
                            // onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='ชื่อค่าใช้จ่ายเพิ่มเติม'
                        />
                    </Form.Item>
                    <Form.Item name="ราคา/บาท" label="ราคา/บาท" rules={[{ required: true }]}>
                        <Input 
                            name='ราคา/บาท'
                            // onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='ราคา/บาท'
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <ManageUserTable data={data}/>
            {/* เนื้อหาหน้าหลัก */}
        </div>
    );
};

export default ManageUserPage;