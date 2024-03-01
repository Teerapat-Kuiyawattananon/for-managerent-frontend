import React, { useState } from 'react';
import YourReportTable from './yourReportTable';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload , Form , Modal ,Input} from 'antd';

const data = [
    {
      key: '1',
      placeName: 'ห้องน้ำห้อง 101',
      problemName: 'น้ำไม่ไหล',
      sentDate: new Date(),
      reportStatus: 'กำลังดำเนินการแก้ไข',
    },
    {
        key: '2',
        placeName: 'ห้องน้ำห้อง 101',
        problemName: 'น้ำไม่ไหล',
        sentDate: new Date(),
        reportStatus: 'แก้ไขเสร็จสิ้น',
    },
    {
        key: '3',
        placeName: 'ห้องน้ำห้อง 101',
        problemName: 'น้ำไม่ไหล',
        sentDate: new Date(),
        reportStatus: 'แก้ไขเสร็จสิ้นรอยืนยัน',
    },
    
  ];

const YourReportTap: React.FC = () => {
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
    
      const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px"}}>
                <Button type="primary" onClick={showModal}>
                    แจ้งปัญหา
                </Button>
                <Modal title="เพิ่มประกาศ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                    <Form.Item name="หัวข้อปัญหา" label="หัวข้อปัญหา" rules={[{ required: true }]}>
                        <Input
                            name='หัวข้อปัญหา'
                            // onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='หัวข้อปัญหา'
                        />
                    </Form.Item>
                    <Form.Item name="สถานที่เกิดปัญหา" label="สถานที่เกิดปัญหา" rules={[{ required: true }]}>
                        <Input
                            name='สถานที่เกิดปัญหา'
                            // onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='สถานที่เกิดปัญหา'
                        />
                    </Form.Item>
                    <Form.Item name="คำอธิบาย" label="คำอธิบาย" rules={[{ required: true }]}>
                        <Input.TextArea
                            name='คำอธิบาย'
                            // onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='คำอธิบาย'
                        />
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        label="รูปภาพของคุณ"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
                </Modal>
            </div>
            <YourReportTable data={data}/>
        </div>
    );
};

export default YourReportTap;