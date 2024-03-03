import React, {useState} from 'react'
import { Button, Form, Input,  DatePicker , Image , Popconfirm} from 'antd';
import { Link } from 'react-router-dom';

interface ManageUserDetailState {
  name: string
  lastname: string
  nickname: string
  birthday: number
  id_card: number
  id_line: string
  email: string
  tel: string
}

const ManageUserDetail: React.FC = () => {
  const [formData, setFormData] = useState<ManageUserDetailState>({
    name: '',
    lastname: '',
    nickname: '',
    birthday: 0,
    id_card: 0,
    id_line: '',
    email: '',
    tel: '',
  })
  const [isEditing, setIsEditing] = useState(false);


  const handleEditSave = () => {
    if (isEditing) {
      // โค้ดสำหรับบันทึกข้อมูลหลังจากการแก้ไข
    } else {
      // โค้ดสำหรับเปิดโหมดแก้ไข
    }
    setIsEditing(!isEditing);
  };
  

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value
    })
  }
  
  

    return (
        <>
          <Form  
            name="validateOnly" 
            layout="vertical" 
            autoComplete="off"
          >
            <div className='h  justify-start'>
            {/* ปุ่มยกเลิกเช่าด้านขวาบนสุด */}
            </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item name="ชื่อจริง" label="ชื่อจริง" rules={[{ required: true }]}>
                  <Input 
                    name='name'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='ชื่อจริง'
                  />
                </Form.Item>
              </div>
              <div className='w-1/2 h-1'>
                <Form.Item name="นามสกุล" label="นามสกุล" rules={[{ required: true }]}>
                  <Input
                    name='lastname '
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='นามสกุล'
                  />
                </Form.Item>
              </div>
            </div>
      
            <div className='flex  justify-start mt4'>
              <div className='w-1/2 mr-3'>
                <Form.Item name="ชื่อเล่น" label="ชื่อเล่น" rules={[{ required: true }]}>
                  <Input 
                    name='nickname'
                    onChange={handleChange}
                    placeholder='ชื่อเล่น'
                    style={{ width: '85%' }}
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item name="วันเกิด" label="วันเกิด" rules={[{ required: true },]}>
                  <DatePicker 
                    name='birt'
                    type='number'
                    onChange={handleChange}
                    placeholder='วันเกิด' 
                    style={{ width: '85%' }}
                  />
                </Form.Item>
              </div>
            </div>
      
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item name="เลขบัตรประชาชน" label="เลขบัตรประชาชน" rules={[{ required: true }, ]}>
                  <Input  
                    name='id_card'
                    onChange={handleChange}
                    placeholder='เลขบัตรประชาชน' 
                    style={{ width: '85%' }}
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item name="Line ID" label="Line ID" rules={[{ required: true }]}>
                  <Input
                    name='id_line'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='Line ID'
                  />
                </Form.Item>
              </div>
            </div>
            
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item name="อีเมล" label="อีเมล" rules={[{ required: true }]}>
                  <Input 
                    name='email'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='อีเมล'
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item name="เบอร์โทรศัพท์" label="เบอร์โทรศัพท์" rules={[{ required: true }]}>
                  <Input
                    name='tel'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='เบอร์โทรศัพท์'
                  />
                </Form.Item>
              </div>
            </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item name="โปรไฟล์" label="โปรไฟล์" rules={[{ required: true }]}>
                  <Input 
                    name='email'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='โปรไฟล์'
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item name="Password" label="รหัสผ่าน" rules={[{ required: true }]}>
                  <Input
                    name='tel'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='รหัสผ่าน'
                  />
                </Form.Item>
              </div>
            </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item name="ที่อยู่ปัจจุบัน" label="ที่อยู่ปัจจุบัน" rules={[{ required: true }]}>
                  <Input.TextArea 
                    name='email'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='ที่อยู่ปัจจุบัน'
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item name="ที่อยู่ตามสำเนาทะเบียนบ้าน" label="ที่อยู่ตามสำเนาทะเบียนบ้าน" rules={[{ required: true }]}>
                  <Input.TextArea 
                    name='tel'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='ที่อยู่ตามสำเนาทะเบียนบ้าน'
                  />
                </Form.Item>
              </div>
            </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item name="บัตรประชาชน" label="บัตรประชาชน" rules={[{ required: true }]}>
                <Image 
                    width={200} // กำหนดความกว้างของรูป
                    src="URL_ของ_รูปภาพ_บัตรประชาชน" // ระบุ URL ของรูปภาพบัตรประชาชนที่ต้องการแสดง
                    placeholder={<div>กำลังโหลด...</div>} // เพิ่ม placeholder สำหรับการโหลด
                />
                </Form.Item>
              </div>
            </div>
            
            
            
            <div className='flex justify-between'>
              {/* ปุ่มย้อนกลับด้านล่างซ้าย */}
              <Link to="/manageUser">
                <Button type="default">
                   ย้อนกลับ
                </Button>
              </Link>
              {/* ปุ่มแก้ไข/บันทึกด้านล่างขวา */}
              <Button type={isEditing ? "primary" : "default"} onClick={handleEditSave} style={{ marginBottom: '10px', marginRight: '10px' }}>
                {isEditing ? 'บันทึก' : 'แก้ไข'}
              </Button>
            </div>
          </Form>
        
        </>
      );
    }
  
  export default ManageUserDetail;