import React, { useState }  from 'react';
import { NotificationOutlined , UploadOutlined } from '@ant-design/icons';
import { Button , Modal , Form, Input, Upload } from 'antd';
import './annoucePage.css';

const AnnoucePage: React.FC = () => {
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><NotificationOutlined /> ข้อมูลข่าวสาร</span>
                <Button type="primary" onClick={showModal}>
                    เพิ่มประกาศ
                </Button>
                <Modal title="เพิ่มประกาศ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                    <Form.Item name="หัวข้อประกาศ" label="หัวข้อประกาศ" rules={[{ required: true }]}>
                        <Input
                            name='หัวข้อประกาศ'
                            // onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='หัวข้อประกาศ'
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
            <div className="dividerUnder"> <style> </style> </div>
             
            <div className="dataContainer">
                <h2>ไม่มีประกาศในขณะนี้</h2>
                <p></p>
                <div className="imageContainer">
                    {/* รูปภาพจะอยู่ในสี่เหลี่ยมผืนผ้า */}
                    <img src="path_to_image" alt="รูปภาพ" />
                </div>
            </div>
        </div>
    );
};

export default AnnoucePage;
