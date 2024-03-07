import React, {useState} from 'react'
import { Button, Form, Input,  List, Checkbox} from 'antd';
import PermissionSettingTable from './permissionSettingTable';


  interface PermissionSettingState {
    rolePermission: string

  }

const PermissionSetting : React.FC = () => {
    const [formData, setFormData] = useState<PermissionSettingState>({
        rolePermission: '',
      })

      const data = [
        {
            key: '1',
            rolePermission: 'หน้าหลัก',
        },
        {
            key: '2',
            rolePermission: 'รายการห้องเช่า',
        },
        {
            key: '3',
            rolePermission: 'ใบแจ้งหนี้',
        },
        {
          key: '4',
          rolePermission: 'กรอกค่าน้ำค่าไฟ',
        },
        {
          key: '5',
          rolePermission: 'ตั้งค่าค่าใช้จ่าย',
        },
        {
          key: '6',
          rolePermission: 'ประกาศทั้งหมด',
        },
        {
          key: '7',
          rolePermission: 'ใบแจ้งหนี้ของคุณ',
        },
        {
          key: '8',
          rolePermission: 'ประกาศของคุณ',
        },
        {
          key: '9',
          rolePermission: 'หอพักของคุณ',
        },
        {
          key: '10',
          rolePermission: 'การจัดการผู้ใช้',
        },
        {
          key: '11',
          rolePermission: 'ตั้งค่าสิทธิ์การเข้าใช้งาน',
        },
      ];
    
      const formRef = React.useRef();
    
      const handleChange = (e: any) => {
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
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
        onFinishFailed={onFinishFailed}
        >
          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
            <div className='mr-3'>
                <Form.Item name="ชื่อตำแหน่ง" label="ชื่อตำแหน่ง" rules={[{ required: true }]}>
                    <Input 
                        name='ชื่อตำแหน่ง'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='ชื่อตำแหน่ง'/>
                </Form.Item>
            </div>
            <div className=' mr-3'>
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
            <div className='w-1/2' >
              <PermissionSettingTable data={data}/>
            </div>
          </div>

          <div className=' justify-start mt4'>
            {/* <div className='w-1/2 mr-3'>
                <Form.Item name="คำอธิบายตำแหน่ง" label="คำอธิบายตำแหน่ง" rules={[{ required: true }]}>
                    <Input.TextArea 
                        name='คำอธิบายตำแหน่ง'
                        onChange={handleChange}
                        placeholder='คำอธิบายตำแหน่ง'
                        style={{
                        width: '85%',
                    }} />
                </Form.Item>
            </div> */}
          </div>
          
          <div className='flex justify-between' style={{ marginTop: "30px" }}>
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
