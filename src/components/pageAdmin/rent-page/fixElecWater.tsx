import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message} from 'antd';
import { useParams } from 'react-router-dom';
import ApartmentService from '../../../services/apartment.service';

const SettingElecWater: React.FC = () => {
    const { apartId } = useParams();
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        water_unit_price: 0,
        electricity_unit_price: 0,
        information: '',
    })

    useEffect(() => {
        // โค้ดสำหรับดึงข้อมูลค่าน้ำค่าไฟจาก API
        const fetchData = async () => {
            const resData = await ApartmentService.getApartmentWaterElecPrice(Number(apartId))
            console.log("resData", resData)
            setFormData(resData.data)
            form.resetFields()
        }
        fetchData()
        // form.resetFields()
        console.log("formData", formData)
    }
    , [])

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const data = {
            water_unit_price: Number(values.ค่าน้ำ),
            electricity_unit_price: Number(values.ค่าไฟ),
            information: values.หมายเหตุ,
        }
        console.log("data", data)
        const resEdit = await ApartmentService.updateApartmentWaterElecPrice(Number(apartId), data)
        console.log("resEdit", resEdit)
        if (resEdit.status === 200) {
            console.log('Success:', values);
            message.success('บันทึกข้อมูลสำเร็จ')
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <Form
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            form={form}
        // form={formRef.current}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <div className='flex  justify-start'>
                <div className='w-1/2 mr-3'>
                    <Form.Item initialValue={formData.water_unit_price} name="ค่าน้ำ" label="ค่าน้ำ/หน่วย" rules={[{ required: true }]}>
                        <Input
                            type='number'
                            name='name'
                            // value={formData.water_unit_price}
                            style={{ width: '85%', }} placeholder='ค่าน้ำ' />
                    </Form.Item>
                </div>
                <div className='w-1/2 h-1'>
                    <Form.Item initialValue={formData.electricity_unit_price} name="ค่าไฟ" label="ค่าไฟ/หน่วย" rules={[{ required: true }]}>
                        <Input
                            type='number'
                            name='address'
                            value={formData.electricity_unit_price}
                            style={{
                                width: '85%',
                            }} placeholder='ค่าไฟ' />
                    </Form.Item>
                </div>
            </div>

            <div className='flex  justify-start'>
                <div className='w-1/2 mr-3 mb-20'>
                    <Form.Item initialValue={formData.information} name="หมายเหตุ" label="หมายเหตุ" rules={[{ required: true }]}>
                        <Input.TextArea
                            name='address'
                            // defaultValue={formData.information}
                            style={{
                                width: '85%',
                            }} placeholder='หมายเหตุ' />
                    </Form.Item>
                </div>
            </div>
            <div className='flex justify-end'>
                <Button 
                    type="primary" 
                    htmlType='submit'>บันทึก
                </Button>
            </div>
        </Form>
    );
};

export default SettingElecWater;