import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface RoomListPageAdd3Props {
  next: () => void;
  currentState: number;
  valueData: any;
}

interface RoomListPageAdd3State {
  address_p1: string;
  address_p2: string;
  province_p: string;
  district_p: string;
  county_p: string;
  zipcode_p: string;

  address_h1: string;
  address_h2: string;
  province_h: string;
  district_h: string;
  county_h: string;
  zipcode_h: string;
}

const RoomListPageAdd3 = ({ next, currentState, valueData}: RoomListPageAdd3Props) => {
  const { apartId, roomId} = useParams()
  const [formData, setFormData] = useState<RoomListPageAdd3State>({
    address_p1: '',
    address_p2: '',
    province_p: '',
    district_p: '',
    county_p: '',
    zipcode_p: '',

    address_h1: '',
    address_h2: '',
    province_h: '',
    district_h: '',
    county_h: '',
    zipcode_h: '',
  });

  const handleCopyAddress = () => {
    const newFormData = formData
    newFormData.address_h1 = formData.address_p1
    setFormData(newFormData) 
    console.log(formData)
  };

  const handleNext = () => {
    console.log(currentState)
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value
    })
    // console.log(formData)
  }

  const getPermanentAddress = (data : any) => {
    return  data.address_p1 + " ตำบล "  + data.county_p + " อำเภอ " + data.district_p + " จังหวัด " + data.province_p + " รหัสไปรษณีย์ " + data.zipcode_p
  }

  const handleSubmit = async (values : any) => {
    try {  
        valueData.form1.permanent_address = getPermanentAddress(values)
        valueData.form2 = values
        const res = await axios.post(`http://localhost:3232/api/room/${roomId}/register`, valueData.form1);
        if (res.status === 200) {
          valueData.form1.renter_id = res.data.renter_id
          next()
        }
        } catch (error) {
          console.log('Failed:', formData);
        }
}

 const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
  console.log('Failed:', formData);
}

    
      return (
        <Form  
          name="validateOnly" 
          layout="vertical" 
          autoComplete="off"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <span className='text-lg font-bold' > ที่อยู่ตามทะเบียนบ้าน </span>
          <div className='flex  justify-start mt-1'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="address_p1" label="ที่อยู่" rules={[{ required: true }]}>
                    <Input 
                        name = "address_p1"
                        value={formData.address_p1}
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='ที่อยู่'/>
                </Form.Item>
            </div>
            {/* <div className='w-1/2 h-1'>
                <Form.Item name="address_p2" label="ที่อยู่ บรรทัดที่ 2" rules={[{ required: true }]}>
                    <Input
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        // height: '120px',
                        }} placeholder='ที่อยู่ บรรทัดที่ 2'/>
                </Form.Item>
            </div> */}
          </div>

          <div className='flex  justify-start mt4'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="province_p" label="จังหวัด" rules={[{ required: true }]}>
                    <Input 
                        name='province_p'
                        onChange={handleChange}
                        placeholder='จังหวัด'
                        style={{
                        width: '85%',
                    }} />
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item name="district_p" label="อำเภอ/เขต" rules={[{ required: true },]}>
                    <Input 
                        name='district_p'
                        onChange={handleChange}
                        placeholder='อำเภอ/เขต' style={{
                        width: '85%',
                    }}/>
                </Form.Item>
            </div>
          </div>

          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="county_p" label="ตำบล/แขวง" rules={[{ required: true }, ]}>
                    <Input  
                        name='county_p'
                        onChange={handleChange}
                        placeholder='ตำบล/แขวง' style={{
                        width: '85%',
                }}/>
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item name="zipcode_p" label="รหัสไปรษณีย์" rules={[{ required: true }]}>
                    <Input
                        name='zipcode_p'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='รหัสไปรษณีย์'/>
                </Form.Item>
            </div>
          </div>



          {/* <span> ที่อยู่ปัจุบัน
            <Button type="primary" style={{ marginLeft: 20 }} onClick ={handleCopyAddress} >
              คัดลอกที่อยู่ตามทะเบียนบ้าน
            </Button>
          </span>
          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="address_h1" label="ที่อยู่ บรรทัดที่ 1" rules={[{ required: true }]}>
                    <Input 
                        name = "address_h1"
                        value={formData.address_h1}
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='ที่อยู่ บรรทัดที่ 1'/>
                </Form.Item>
            </div>
            <div className='w-1/2 h-1'>
                <Form.Item name="address_h2" label="ที่อยู่ บรรทัดที่ 2" rules={[{ required: true }]}>
                    <Input
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        // height: '120px',
                        }} placeholder='ที่อยู่ บรรทัดที่ 2'/>
                </Form.Item>
            </div>
          </div>

          <div className='flex  justify-start mt4'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="province_h" label="จังหวัด" rules={[{ required: true }]}>
                    <Input 
                        onChange={handleChange}
                        placeholder='จังหวัด'
                        style={{
                        width: '85%',
                    }} />
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item name="district_h" label="ตำบล/อำเภอ" rules={[{ required: true },]}>
                    <Input 
                        onChange={handleChange}
                        placeholder='ตำบล/อำเภอ' style={{
                        width: '85%',
                    }}/>
                </Form.Item>
            </div>
          </div>

          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="county_h" label="เขต" rules={[{ required: true }, ]}>
                    <Input  
                        onChange={handleChange}
                        placeholder='เขต' style={{
                        width: '85%',
                }}/>
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item name="zipcode_h" label="รหัสไปรษณีย์" rules={[{ required: true }]}>
                    <Input
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='รหัสไปรษณีย์'/>
                </Form.Item>
            </div>
          </div> */}
    
          <Button type="primary" htmlType='submit' style={{ }} onClick={handleNext} >
              ต่อไป
          </Button>
      </Form>
      )
    }
  
  export default RoomListPageAdd3;