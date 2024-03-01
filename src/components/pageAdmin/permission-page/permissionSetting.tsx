import React, {useState} from 'react'
import { Button, Form, Input,  List, Checkbox} from 'antd';
import './permissionSetting.css'

interface PermissionSettingProps {
    next : () => void
    currentState: number
  }

  interface PermissionSettingState {
    name: string
    lastname: string
    nickname: string
    birthday: number
    id_card: number
    id_line: string
    email: string
    tel: string
  }

const PermissionSetting = ({next} : PermissionSettingProps)  => {
    const [formData, setFormData] = useState<PermissionSettingState>({
        name: '',
        lastname: '',
        nickname: '',
        birthday: 0,
        id_card: 0,
        id_line: '',
        email: '',
        tel: '',
      })

      const data = [
        'หน้าหลัก',
        'รายการห้องเช่า',
        'จัดการใบแจ้งหนี้',
        'กระดานสรุปรายงานผล',
        'เขียนประกาศ',
        'แจ้งเตือนพัสดุและ สิ่งของ',
        'ใบแจ้งหนี้ขงอคุณ',
        'แจ้งปัญหา',
        'พัสดุและ สิ่งของตกค้าง',
        'หอพักของคุณ',
        'การจัดการผู้ใช้',
        'ตั่งค่าสิทธิเข้าใช้งาน',
        'การตั้งค่าหอพัก',
      ];
    
      const formRef = React.useRef();
    
      const handleChange = (e: any) => {
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
      }
    
      
    
      const handleSubmit = async (_: React.FormEvent<HTMLInputElement>) => {
        try {  
            console.log('Success:', formData);
            next()
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
        form={formRef.current}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        >
          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="ชื่อตำแหน่ง" label="ชื่อตำแหน่ง" rules={[{ required: true }]}>
                    <Input 
                        name='ชื่อตำแหน่ง'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='ชื่อตำแหน่ง'/>
                </Form.Item>
            </div>
            <div className='w-1/2' >
                <List
                    size="small"
                    header={<div>ฟีเจอร์</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                <List.Item className="custom-list-item">
                    <span className="text">{item}</span>
                    <Checkbox className="checkbox" onChange={(e) => console.log(e)} />
                </List.Item>
                )}
            />
            </div>
          </div>

          <div className=' justify-start mt4'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="คำอธิบายตำแหน่ง" label="คำอธิบายตำแหน่ง" rules={[{ required: true }]}>
                    <Input.TextArea 
                        name='คำอธิบายตำแหน่ง'
                        onChange={handleChange}
                        placeholder='คำอธิบายตำแหน่ง'
                        style={{
                        width: '85%',
                    }} />
                </Form.Item>
            </div>
          </div>
          
            <div className='flex justify-between'>
              {/* ปุ่มย้อนกลับด้านล่างซ้าย */}
                <Button type="primary">
                   ย้อนกลับ
                </Button>
              {/* ปุ่มแก้ไข/บันทึกด้านล่างขวา */}
              <Button type="default" style={{ marginBottom: '10px', marginRight: '10px' }}>
                 บันทึก
              </Button>
            </div>
      </Form>
      )
    }
  
  export default PermissionSetting;
