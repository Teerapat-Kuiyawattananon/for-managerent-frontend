import React, { useState } from 'react';
// import ReportTable from './reportTable';
import SettingTable from './settingTable';
import { Button , Modal , Form, Input, } from 'antd';
// import './allAnnounce.css';

const data = [
    {
      key: '1',
      expressName: 'ค่าเน็ต',
      expressPermonth: 500,
      sentDate: new Date(),
      reportStatus: 'รอยืนยันปัญหา',
    },
    {
        key: '2',
        expressName: 'ค่าที่จอดรถ',
        expressPermonth: 200,
        sentDate: new Date(),
        reportStatus: 'ยืนยันปัญหา',
    },
    {
        key: '3',
        expressName: 'ค่าเคเบิ้ลทีวี',
        expressPermonth: 150,
        sentDate: new Date(),
        reportStatus: 'แก้ไขเสร็จสิ้นรอยืนยัน',
    },
    
    
  ];

const SettingPage: React.FC = () => {
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
            <SettingTable data={data}/>
            {/* เนื้อหาหน้าหลัก */}
        </div>
    );
};

export default SettingPage;