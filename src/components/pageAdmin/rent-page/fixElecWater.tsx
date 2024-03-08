import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Space, DatePicker } from 'antd';

const SettingElecWater: React.FC = () => {
    return (
        <Form
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
        // form={formRef.current}
        // onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        >
            <div className='flex  justify-start'>
                <div className='w-1/2 mr-3'>
                    <Form.Item name="ค่าน้ำ" label="ค่าน้ำ" rules={[{ required: true }]}>
                        <Input
                            name='name'
                            style={{ width: '85%', }} placeholder='ค่าน้ำ' />
                    </Form.Item>
                </div>
                <div className='w-1/2 h-1'>
                    <Form.Item name="ค่าไฟ" label="ค่าไฟ" rules={[{ required: true }]}>
                        <Input
                            name='address'
                            style={{
                                width: '85%',
                            }} placeholder='ค่าไฟ' />
                    </Form.Item>
                </div>
            </div>

            <div className='flex  justify-start'>
                <div className='w-1/2 mr-3 mb-20'>
                    <Form.Item name="หมายเหตุ" label="หมายเหตุ" rules={[{ required: true }]}>
                        <Input.TextArea
                            name='address'
                            style={{
                                width: '85%',
                            }} placeholder='หมายเหตุ' />
                    </Form.Item>
                </div>
            </div>
            <div className='flex justify-end'>
                <Button type="primary" htmlType='submit'>บันทึก
                </Button>
            </div>
        </Form>
    );
};

export default SettingElecWater;