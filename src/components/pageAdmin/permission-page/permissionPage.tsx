import React, { useState } from 'react';
// import ReportTable from './reportTable';
import PermissionTable from './permissionTable';
import { Button , Modal , Form, Input, } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import './allAnnounce.css';

const data = [
    {
        key: '1',
        roleName: 'Admins',
    },
    {
        key: '2',
        roleName: 'Renter',
    },
    {
        key: '3',
        roleName: 'Staff',
    },
    
    
  ];

const PermissionPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
      return (
        <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px"}}>
                <Link to= "/permission/detail"> 
                    <Button type="primary">
                        เพิ่มตำแหน่ง
                    </Button>
                </Link>
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
            <PermissionTable data={data}/>
            {/* เนื้อหาหน้าหลัก */}
        </div>
    );
};

export default PermissionPage;