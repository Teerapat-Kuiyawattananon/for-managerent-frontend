import React, {useEffect, useState} from 'react'
import { Button, Form, Input,  DatePicker , Image , Popconfirm, Select, message} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileService from '../../../services/profile.service';
import dayjs from 'dayjs'

interface ManageUserAddState {
  name: string
  last_name: string
  nick_name: string
  birth_day: Date
  id_card_number: string
  line_id: string
  email: string
  mobile_number: string
  profile_id: number

  permanent_address: string;
  full_name: string;
  username: string;
  password: string;
}

const ProfileRole = [{
  value: 'admin',
  label: 'Admin',
},
{
  value: 'staff',
  label: 'Staff',
},
{
  value: 'renter',
  label: 'Renter',
},
];

interface ProfileRole {
  value: number
  label: string
}


const ManageUserAdd: React.FC = () => {
  const [form] = Form.useForm();
  const nevigate = useNavigate()
  const [profileData, setProfileData] = useState<ProfileRole[]>([])
  const [formData, setFormData] = useState<ManageUserAddState>({
    name: '',
    last_name: '',
    nick_name: '',
    birth_day: new Date(),
    id_card_number: '',
    line_id: '',
    email: '',
    mobile_number: '',
    profile_id: 0,
    permanent_address: '',
    full_name: '',
    username: '',
    password: '',
  })
  const [isEditing, setIsEditing] = useState(false);
  const { apartId } = useParams();

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
  const onFinish = async (values: any) => {
    // setFormData({
    //   name: values['ชื่อจริง'],
    //   last_name: values['นามสกุล'],
    //   nick_name: values['ชื่อเล่น'],
    //   birth_day: new Date(values['วันเกิด'].format('YYYY-MM-DD')),
    //   id_card_number: values['เลขบัตรประชาชน'],
    //   line_id: values['Line ID'],
    //   email: values['อีเมล'],
    //   mobile_number: values['เบอร์โทรศัพท์'],
    //   profile_id: values['โปรไฟล์'],
    //   permanent_address: values['ที่อยู่'],
    //   full_name: values['ชื่อจริง'] + " " + values['นามสกุล'],
    //   username: values['อีเมล'],
    //   password: values['Password'],
    // })
    try {
      // check is empty
      if (values['ชื่อจริง'] === undefined || values['นามสกุล'] === undefined || values['ชื่อเล่น'] === undefined || values['วันเกิด'] === undefined 
      || values['เลขบัตรประชาชน'] === undefined || values['Line ID'] === undefined || values['อีเมล'] === undefined 
      || values['เบอร์โทรศัพท์'] === undefined || values['โปรไฟล์'] === undefined || values['ที่อยู่'] === undefined || values['Password'] === undefined) {
        console.log('กรุณากรอกข้อมูลให้ครบถ้วน')
        return
      }
      formData.name = values['ชื่อจริง']
      formData.last_name = values['นามสกุล']
      formData.nick_name = values['ชื่อเล่น']
      formData.birth_day = dayjs(values['วันเกิด']).toDate()
      formData.id_card_number = values['เลขบัตรประชาชน']
      formData.line_id = values['Line ID']
      formData.email = values['อีเมล']
      formData.mobile_number = values['เบอร์โทรศัพท์']
      formData.profile_id = values['โปรไฟล์']
      formData.permanent_address = values['ที่อยู่']
      formData.full_name = values['ชื่อจริง'] + " " + values['นามสกุล']
      formData.username = values['อีเมล']
      formData.password = values['Password']
      console.log('Success: FormData', formData);
      console.log("pass")
      const res = await ProfileService.addUserWithProfile(Number(apartId), formData)
      console.log('Success: res', res);
      if (res.status === 200) {
        message.success('เพิ่มผู้ใช้สำเร็จ')
        nevigate(`/apartment/${apartId}/manageUser`)
      }
    }
    catch (error) {
      console.log('Failed:', formData);
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  
  
  useEffect(() => {
    // โค้ดที่ต้องการให้ทำงานหลังจากการ render
    const fetchData = async () => {
      try {
        // โค้ดที่ใช้ในการดึงข้อมูลจาก server
        const res = await ProfileService.getProfileList(Number(apartId))
        console.log(res)
        if (res.status == 200) {
          setProfileData(res.add_user)
          form.resetFields()
        }
        // setProfileData(response.data);
      } catch (error) {
        console.error('มีข้อผิดพลาดในการดึงข้อมูล: ', error);
      }
    }
    fetchData()
  }, [])
    return (
        <>
          <Form  
            name="validateOnly" 
            layout="vertical" 
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
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
                    name='birth_day'
                    type='number'
                    // onChange={handleChange}
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
                <Form.Item name="โปรไฟล์" label="ตำแหน่ง" rules={[{ required: true }]}>
                  {/* <Input 
                    name='email'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='โปรไฟล์'
                  /> */}
                  <Select
                    style={{ width: '85%' }}
                    // onChange={handleChange}
                    options={profileData}
                    placeholder="ตำแหน่ง"
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
                <Form.Item name="ที่อยู่" label="ที่อยู่" rules={[{ required: true }]}>
                  <Input.TextArea 
                    name='email'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='ที่อยู่'
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                {/* <Form.Item name="ที่อยู่ตามสำเนาทะเบียนบ้าน" label="ที่อยู่ตามสำเนาทะเบียนบ้าน" rules={[{ required: true }]}>
                  <Input.TextArea 
                    name='tel'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='ที่อยู่ตามสำเนาทะเบียนบ้าน'
                  />
                </Form.Item> */}
              </div>
            </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                {/* <Form.Item name="บัตรประชาชน" label="บัตรประชาชน" rules={[{ required: true }]}>
                <Image 
                    width={200} // กำหนดความกว้างของรูป
                    src="URL_ของ_รูปภาพ_บัตรประชาชน" // ระบุ URL ของรูปภาพบัตรประชาชนที่ต้องการแสดง
                    placeholder={<div>กำลังโหลด...</div>} // เพิ่ม placeholder สำหรับการโหลด
                />
                </Form.Item> */}
              </div>
            </div>
            
            
            
            <div className='flex justify-between'>
              {/* ปุ่มย้อนกลับด้านล่างซ้าย */}
              {/* <Link to="/manageUser">
                <Button type="default">
                   ย้อนกลับ
                </Button>
              </Link> */}
              {/* ปุ่มแก้ไข/บันทึกด้านล่างขวา */}
              <Button type="primary" htmlType='submit' onClick={onFinish} style={{ marginBottom: '10px', marginRight: '10px' }}>
                เพิ่มผู้ใช้
              </Button>
            </div>
          </Form>
        
        </>
      );
    }
  
  export default ManageUserAdd;