import React, {useEffect, useState} from 'react'
import { Button, Form, Input,  DatePicker , Image , Popconfirm, Select, message} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileService from '../../../services/profile.service';
import dayjs from 'dayjs'

interface ManageUserDetailState {
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


const ManageUserDetail: React.FC = () => {
  const [form] = Form.useForm();
  const [profileData, setProfileData] = useState<ProfileRole[]>([])
  const [formData, setFormData] = useState<ManageUserDetailState>({
    name: '',
    last_name: '',
    nick_name: '',
    birth_day: new Date(),
    id_card_number: '',
    line_id: '',
    email: '',
    mobile_number: '',
    profile_id: 3,
    permanent_address: '',
    full_name: '',
    username: '',
    password: '',
  })
  const [isEditing, setIsEditing] = useState(true);
  const { apartId, userId } = useParams();

  const handleEditSave = () => {
    if (isEditing) {
      // โค้ดสำหรับบันทึกข้อมูลหลังจากการแก้ไข
    } else {
      // โค้ดสำหรับเปิดโหมดแก้ไข
    }
    setIsEditing(!isEditing);
  };

  const handlerSave = (values : any) => {
    // console.log("value", values)
    console.log("formData", formData)
    setIsEditing(!isEditing);
  }
  

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value
    })
  }
  const onFinish = async (values: any) => {
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
      const res = await ProfileService.updateUserWithProfile(Number(apartId), Number(userId), formData)
      console.log('Success: res', res);
      if (res.status === 200) {
        message.success('แก้ไขผู้ใช้สำเร็จ')
        // nevigate(`/apartment/${apartId}/manageUser`)
      } else
        message.error('แก้ไขผู้ใช้ไม่สำเร็จ')
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
    console.log("from useeffect")
    const fetchData = async () => {
      try {
        // โค้ดที่ใช้ในการดึงข้อมูลจาก server
        const res = await ProfileService.getProfileList(Number(apartId))
        console.log(res)
        if (res.status == 200) {
          setProfileData(res.add_user)
          // form.resetFields()
        }
        const resUser = await ProfileService.getProfileUserDetail(Number(apartId), Number(userId))
        console.log(resUser)
        if (resUser.status == 200) {
          setFormData(resUser.data)
          console.log('formData', formData)
          // console.log('resUser.data', resUser.data)
          form.resetFields()
        }
        // setProfileData(response.data);
      } catch (error) {
        console.error('มีข้อผิดพลาดในการดึงข้อมูล: ', error);
      }
    }
    fetchData()
    // form.resetFields()
  }, [])
    return (
        <>
          <Form  
            layout="vertical" 
            autoComplete="off"
            disabled={isEditing}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <div className='h  justify-start'>
            {/* ปุ่มยกเลิกเช่าด้านขวาบนสุด */}
            </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.name} name="ชื่อจริง" label="ชื่อจริง" rules={[{ required: true }]}>
                  <Input 
                    name='name'
                    // defaultValue={formData.name}
                    value={formData.name}
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='ชื่อจริง'
                  />
                </Form.Item>
              </div>
              <div className='w-1/2 h-1'>
                <Form.Item initialValue={formData.last_name} name="นามสกุล" label="นามสกุล" rules={[{ required: true }]}>
                  <Input
                    // name='last_name'
                    defaultValue={formData.last_name}
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='นามสกุล'
                  />
                </Form.Item>
              </div>
            </div>
      
            <div className='flex  justify-start mt4'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.nick_name} name="ชื่อเล่น" label="ชื่อเล่น" rules={[{ required: true }]}>
                  <Input 
                    name='nick_name'
                    // defaultValue={formData.nick_name}
                    onChange={handleChange}
                    placeholder='ชื่อเล่น'
                    style={{ width: '85%' }}
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item initialValue={dayjs(formData.birth_day)} name="วันเกิด" label="วันเกิด" rules={[{ required: true },]}>
                  <DatePicker 
                    name='birth_day'
                    type='number'
                    // defaultValue={dayjs(formData.birth_day)}
                    // onChange={handleChange}
                    placeholder='วันเกิด' 
                    style={{ width: '85%' }}
                  />
                </Form.Item>
              </div>
            </div>
      
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.id_card_number} name="เลขบัตรประชาชน" label="เลขบัตรประชาชน" rules={[{ required: true }, ]}>
                  <Input  
                    name='id_card_number'
                    onChange={handleChange}
                    // defaultValue={formData.id_card_number}
                    placeholder='เลขบัตรประชาชน' 
                    style={{ width: '85%' }}
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item initialValue={formData.line_id} name="Line ID" label="Line ID" rules={[{ required: true }]}>
                  <Input
                    name='line_id'
                    // defaultValue={formData.line_id}
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='Line ID'
                  />
                </Form.Item>
              </div>
            </div>
            
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.email} name="อีเมล" label="อีเมล" rules={[{ required: true }]}>
                  <Input 
                    name='email'
                    // defaultValue={formData.email}
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='อีเมล'
                  />
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item initialValue={formData.mobile_number} name="เบอร์โทรศัพท์" label="เบอร์โทรศัพท์" rules={[{ required: true }]}>
                  <Input
                    name='mobile_number'
                    // defaultValue={formData.mobile_number}
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='เบอร์โทรศัพท์'
                  />
                </Form.Item>
              </div>
            </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.profile_id} name="โปรไฟล์" label="ตำแหน่ง" rules={[{ required: true }]}>
                  {/* <Input 
                    name='email'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='โปรไฟล์'
                  /> */}
                  <Select
                    style={{ width: '85%' }}
                    // onChange={handleChange}
                    // defaultValue={formData.profile_id}
                    options={profileData}
                    placeholder="ตำแหน่ง"
                  />
                </Form.Item>
        
              </div>
              <div className='w-1/2'>
                <Form.Item initialValue={formData.password} name="Password" label="รหัสผ่าน" rules={[{ required: true }]}>
                  <Input.Password
                    name='password'
                    // defaultValue={formData.password}
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='รหัสผ่าน'
                  />
                </Form.Item>
              </div>
            </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.permanent_address} name="ที่อยู่" label="ที่อยู่" rules={[{ required: true }]}>
                  <Input.TextArea 
                    name='permanent_address'
                    // defaultValue={formData.permanent_address}
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
              
            </div>

            {isEditing ? <Button disabled={false} htmlType='submit' type="primary" onClick={handleEditSave} style={{ marginBottom: '10px', marginRight: '10px' }}>
                แก้ไข
            </Button>
          : <Button disabled={false} type="primary" onClick={handlerSave} style={{ marginBottom: '10px', marginRight: '10px' }}>
          บันทึก
      </Button> }
          </Form>
          
        </>
      );
    }
  
  export default ManageUserDetail;