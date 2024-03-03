import React, {useEffect, useState} from 'react'
import { Button, Form, Input,  DatePicker , Image , Popconfirm, message} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RoomService from '../../../../services/room.service';
import dayjs from 'dayjs'
import axios from 'axios'
interface RoomListPageDetailState {
  name: string
  last_name: string
  nick_name: string
  birth_day: Date
  id_card_number: string
  line_id: string
  email: string
  mobile_number: string
  user_evidence_attachment: []

  address_p: string;
  province_p: string;
  district_p: string;
  county_p: string;
  zipcode_p: string;

  permanent_address: string;
  full_name: string;
}

interface DataResponse {
}



const RoomListPageDetail: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { apartId, roomId} = useParams()
  const [formData, setFormData] = useState<RoomListPageDetailState>({
    name: '',
    last_name: '',
    nick_name: '',
    birth_day:  new Date(),
    id_card_number: '',
    line_id: '',
    email: '',
    mobile_number: '',

    user_evidence_attachment: [],
    address_p: '',
    province_p: '',
    district_p: '',
    county_p: '',
    zipcode_p: '',

    permanent_address: '',
    full_name: '',
  })
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = async () => {
    // โค้ดสำหรับยกเลิกเช่า
    console.log("cancel")
    try {
      const res = await axios.post(`http://localhost:3232/api/apartments/rooms/${roomId}/renter-chekcout`);
      console.log("Response", res)
      if (res.status === 200) {
        message.success('ลบข้อมูลผู้เช่าสำเร็จ');
        navigate(`/apartment/${apartId}/roomlist`)
      }
      }
      catch (error) {
        console.log('Cancel failed:', error);
      }
  };

  const handleEditSave = () => {
    if (isEditing) {
      // โค้ดสำหรับบันทึกข้อมูลหลังจากการแก้ไข
    } else {
      // โค้ดสำหรับเปิดโหมดแก้ไข
    }
    setIsEditing(!isEditing);
    console.log("formData", formData)
  };
  
  const getPermanentAddress = (data : any) => {
    return  data.address_p + " ตำบล "  + data.county_p + " อำเภอ " + data.district_p + " จังหวัด " + data.province_p + " รหัสไปรษณีย์ " + data.zipcode_p
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,"permanent_address" : getPermanentAddress(formData) ,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await RoomService.getRenterByRoomId(Number(roomId));
      setFormData(res.data);
      console.log("After Get", res)
      console.log("Form Data After Get", formData)
      form.resetFields()
    }

    fetchData()
      .catch(console.error)
  }, [])
  
  // edit information
  const handleSubmit = async (values : any) => {
    try {  
        formData.permanent_address = getPermanentAddress(values)
        formData.birth_day = new Date(values['วันเกิด'].format('YYYY-MM-DD'))
        formData.full_name = formData.name + " " + formData.last_name
        console.log("After sumbit", formData)
        const res = await axios.put(`http://localhost:3232/api/apartments/rooms/${roomId}/renter`, formData);
        console.log("Response", res)
        if (res.status === 200) {
        }
        } catch (error) {
          console.log('Failed:', formData);
        }

}
  

    return (
        <>
          <Form  
            form={form}
            name="validateOnly" 
            layout="vertical" 
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <div className='h-20  justify-start'>
            {/* ปุ่มยกเลิกเช่าด้านขวาบนสุด */}
            <Popconfirm
                title="ลบข้อมูลผู้เช่า"
                description="คุณแน่ใจที่จะนำผู้เช่านี้ออกจากห้องเช่าหรือไม่?"
                 okText="ใช่"
                cancelText="ไม่"
                onConfirm={handleCancel}
                 >
                <Button danger>ลบข้อมูลผู้เช่า</Button>
            </Popconfirm>
            </div>
            <span className='text-lg font-bold'> รายละเอียดผู้เช่า </span>
            <div className='flex  justify-start mt-2'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.name} name="ชื่อจริง" label="ชื่อจริง" rules={[{ required: true }]}>
                  {isEditing ? <Input 
                    name='name'
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='ชื่อจริง'
                   
                  /> : 
                  <Input 
                    name='name'
                    disabled
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='ชื่อจริง'
                   
                  />}
                </Form.Item>
              </div>
              <div className='w-1/2 h-1'>
                <Form.Item initialValue={formData.last_name} name="นามสกุล" label="นามสกุล" rules={[{ required: true }]}>
                  {isEditing ? 
                  <Input
                  name='last_name'
                  onChange={handleChange}
                  style={{ width: '85%' }} 
                  placeholder='นามสกุล'
                /> :
                <Input
                    name='last_name'
                    disabled
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='นามสกุล'
                  />}
                </Form.Item>
              </div>
            </div>
      
            <div className='flex  justify-start mt4'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.nick_name} name="ชื่อเล่น" label="ชื่อเล่น" rules={[{ required: true }]}>
                  {isEditing ? 
                   <Input 
                   name='nick_name'
                   onChange={handleChange}
                   placeholder='ชื่อเล่น'
                   style={{ width: '85%' }}
                 /> :
                 <Input 
                 name='nick_name'
                 disabled
                 onChange={handleChange}
                 placeholder='ชื่อเล่น'
                 style={{ width: '85%' }}
               />}
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item initialValue={dayjs(new Date(formData.birth_day).toString(), "YYYY/MM/DD")} name="วันเกิด" label="วันเกิด" rules={[{ required: true },]}>
                  {isEditing ?
                  <DatePicker 
                  // name='birt'
                  // type='number'
                  // onChange={handleChange}
                  placeholder='วันเกิด' 
                  style={{ width: '85%' }}
                /> :
                <DatePicker 
                    // name='birt'
                    // type='number'
                    // onChange={handleChange}
                    placeholder='วันเกิด' 
                    disabled
                    style={{ width: '85%' }}
                  />}
                </Form.Item>
              </div>
            </div>
      
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.id_card_number} name="เลขบัตรประชาชน" label="เลขบัตรประชาชน" rules={[{ required: true }, ]}>
                 {isEditing ?
                  <Input  
                  name='id_card_number'
                  onChange={handleChange}
                  placeholder='เลขบัตรประชาชน' 
                  style={{ width: '85%' }}
                />
                :
                <Input  
                name='id_card_number'
                onChange={handleChange}
                disabled
                placeholder='เลขบัตรประชาชน' 
                style={{ width: '85%' }}
              />}
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item initialValue={formData.line_id} name="Line ID" label="Line ID" rules={[{ required: true }]}>
                  {isEditing ?
                  <Input
                  name='line_id'
                  onChange={handleChange}
                  style={{ width: '85%' }} 
                  placeholder='Line ID'
                /> :
                <Input
                    name='line_id'
                    disabled
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='Line ID'
                  />}
                </Form.Item>
              </div>
            </div>
            
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.email} name="อีเมล" label="อีเมล" rules={[{ required: true }]}>
                  {isEditing ?
                   <Input 
                   name='email'
                   onChange={handleChange}
                   style={{ width: '85%' }} 
                   placeholder='อีเมล'
                 /> :
                 <Input 
                 name='email'
                 disabled
                 onChange={handleChange}
                 style={{ width: '85%' }} 
                 placeholder='อีเมล'
               />}
                </Form.Item>
              </div>
              <div className='w-1/2'>
                <Form.Item initialValue={formData.mobile_number} name="เบอร์โทรศัพท์" label="เบอร์โทรศัพท์" rules={[{ required: true }]}>
                  {isEditing ?
                  <Input
                  name='mobile_number'
                  onChange={handleChange}
                  style={{ width: '85%' }} 
                  placeholder='เบอร์โทรศัพท์'
                /> :
                <Input
                    name='mobile_number'
                    disabled
                    onChange={handleChange}
                    style={{ width: '85%' }} 
                    placeholder='เบอร์โทรศัพท์'
                  />}
                </Form.Item>
              </div>
            </div>
            <div className='flex  justify-start'>
              {/* <div className='w-1/2 mr-3'>
                <Form.Item name="บัตรประชาชน" label="บัตรประชาชน" rules={[{ required: false }]}>
                <Image 
                    width={200} // กำหนดความกว้างของรูป
                    src="http://localhost:3232/api/file-image?file=2024-03-03_12:44:38.Screenshot 2567-02-01 at 22.27.43.png" // ระบุ URL ของรูปภาพบัตรประชาชนที่ต้องการแสดง
                    placeholder={<div>กำลังโหลด...</div>} // เพิ่ม placeholder สำหรับการโหลด
                />
                </Form.Item>
              </div> */}
            </div>
            <span className='text-lg font-bold'> ที่อยู่ตามทะเบียนบ้าน </span>
            <div className='flex  justify-start mb-2'> </div>
            <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.address_p} name="address_p" label="ที่อยู่" rules={[{ required: true }]}>
                    {isEditing ?
                    <Input 
                    name = "address_p1"
                    onChange={handleChange}
                    style={{
                    width: '85%',
                    }} placeholder='ที่อยู่'/>
                    :
                    <Input 
                        name = "address_p1"
                        disabled
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='ที่อยู่'/>}
                </Form.Item>
            </div>
          </div>

          <div className='flex  justify-start mt4'>
            <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.province_p} name="province_p" label="จังหวัด" rules={[{ required: true }]}>
                    {isEditing ?
                    <Input 
                    name='province_p'
                    onChange={handleChange}
                    placeholder='จังหวัด'
                    style={{
                    width: '85%',
                }} /> :
                <Input 
                        name='province_p'
                        disabled
                        onChange={handleChange}
                        placeholder='จังหวัด'
                        style={{
                        width: '85%',
                    }} />}
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item initialValue={formData.district_p} name="district_p" label="อำเภอ/เขต" rules={[{ required: true },]}>
                    {isEditing ?
                    <Input 
                    name='district_p'
                    onChange={handleChange}
                    placeholder='อำเภอ/เขต' style={{
                    width: '85%',
                }}/> :
                <Input 
                        name='district_p'
                        disabled
                        onChange={handleChange}
                        placeholder='อำเภอ/เขต' style={{
                        width: '85%',
                    }}/>}
                </Form.Item>
            </div>
          </div>

          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
                <Form.Item initialValue={formData.county_p} name="county_p" label="ตำบล/แขวง" rules={[{ required: true }, ]}>
                    {isEditing ?
                    <Input  
                    name='county_p'
                    onChange={handleChange}
                    placeholder='ตำบล/แขวง' style={{
                    width: '85%',
            }}/> :
                    <Input  
                        name='county_p'
                        disabled
                        onChange={handleChange}
                        placeholder='ตำบล/แขวง' style={{
                        width: '85%',
                }}/>}
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item initialValue={formData.zipcode_p} name="zipcode_p" label="รหัสไปรษณีย์" rules={[{ required: true }]}>
                    {isEditing ?
                    <Input
                    name='zipcode_p'
                    onChange={handleChange}
                    style={{
                    width: '85%',
                    }} placeholder='รหัสไปรษณีย์'/> :
                    <Input
                        name='zipcode_p'
                        disabled
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='รหัสไปรษณีย์'/>}
                </Form.Item>
            </div>
          </div>
          <div className='w-1/2 mr-3'>
                <Form.Item name="บัตรประชาชน" label="บัตรประชาชน" rules={[{ required: false }]}>
                <Image 
                    width={400} // กำหนดความกว้างของรูป
                    height={200}
                    src="http://localhost:3232/api/file-image?file=2024-03-03_12:44:38.Screenshot 2567-02-01 at 22.27.43.png" // ระบุ URL ของรูปภาพบัตรประชาชนที่ต้องการแสดง
                    placeholder={<div>กำลังโหลด...</div>} // เพิ่ม placeholder สำหรับการโหลด
                />
                </Form.Item>
              </div>

            <div className='flex justify-between'>
              {/* ปุ่มย้อนกลับด้านล่างซ้าย */}
              {/* <Link to="/roomList"> */}
                <Button type="default" onClick={() => {
                  console.log("formData click", formData)
                }}>
                   ย้อนกลับ
                </Button>
              {/* </Link> */}
              {/* ปุ่มแก้ไข/บันทึกด้านล่างขวา */}
              {isEditing ? 
                <Button type={"primary"} onClick={handleEditSave} style={{ marginBottom: '10px', marginRight: '10px' }}>
                {'บันทึก'}
              </Button> 
              :
                <Button htmlType='submit' type={"default"} onClick={handleEditSave} style={{ marginBottom: '10px', marginRight: '10px' }}>
                {'แก้ไข'}
              </Button>}



              {/* <Button type={isEditing ? "primary" : "default"} onClick={handleEditSave} style={{ marginBottom: '10px', marginRight: '10px' }}>
                {isEditing ? 'บันทึก' : 'แก้ไข'}
              </Button> */}
            </div>
          </Form>
        
        </>
      );
    }
  
  export default RoomListPageDetail;