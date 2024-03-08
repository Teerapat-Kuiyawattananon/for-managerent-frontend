import React, { useState, useEffect } from 'react';
// import ReportTable from './reportTable';
import PermissionTable, { PermissionTableData } from './permissionTable';
import { Button , Modal , Form, Input, } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import ProfileService from '../../../services/profile.service';
// import './allAnnounce.css';

const data = [
    {
        key: 1,
        profile_name: 'ssdf',
    },
    {
        key: '2',
        profile_name: 'Renter',
    },
    {
        key: '3',
        profile_name: 'Staff',
    },
    
    
  ];

interface ProfileData {
    key: React.Key | string;
    profile_name: string;
}

const PermissionPage: React.FC = () => {
    const { apartId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [profileData, setProfileData] = useState<ProfileData[]>([]);
    const [testData, setTestData] = useState<PermissionTableData[]>([])

    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    
      return (
        <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px"}}>
                <Link to={`/apartment/${apartId}/permission/create-profile`}> 
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