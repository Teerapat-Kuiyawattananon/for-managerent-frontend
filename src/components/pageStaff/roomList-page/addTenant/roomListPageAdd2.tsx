import React, {useState} from 'react'
import { Button, Form, Input, InputNumber, Space, DatePicker } from 'antd';

interface RoomListPageAdd2Props {
    next : () => void
    currentState: number
  }

  interface RoomListPageAdd2State {
    name: string
    lastname: string
    nickname: string
    birthday: number
    id_card: number
    id_line: string
    email: string
    tel: string
  }

const RoomListPageAdd2= ({next, currentState} : RoomListPageAdd2Props)  => {
    const [formData, setFormData] = useState<RoomListPageAdd2State>({
        name: '',
        lastname: '',
        nickname: '',
        birthday: 0,
        id_card: 0,
        id_line: '',
        email: '',
        tel: '',
      })
    
      const formRef = React.useRef();
      const handleNext = () => {
        console.log(currentState)
        // next()
      }
    
      const handleChange = (e: any) => {
        // console.log(e.target.type)
        // console.log(e.target.value)
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
      }
    
      
    
      const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        // console.log("test")
        // e.preventDefault()
        try {  
            //   const response = await axios.post('http://localhost:3232/login', formData); // Replace with your API endpoint
            // console.log(formData)
            // e.preventDeafault()
            // e.preventDefault()
            console.log('Success:', formData);
            next()
              // Handle successful registration (e.g., clear form, redirect)
            } catch (error) {
              console.log('Failed:', formData);
            }
            // console.log('Failed:', formData);
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
                <Form.Item name="ชื่อจริง" label="ชื่อจริง2" rules={[{ required: true }]}>
                    <Input 
                        name='name'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='ชื่อจริง'/>
                </Form.Item>
            </div>
            <div className='w-1/2 h-1'>
                <Form.Item name="นามสกุล" label="นามสกุล2" rules={[{ required: true }]}>
                    <Input
                        name='lastname '
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        // height: '120px',
                        }} placeholder='นามสกุล'/>
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
                        style={{
                        width: '85%',
                    }} />
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item name="วันเกิด" label="วันเกิด" rules={[{ required: true },]}>
                     <DatePicker 
                        name='birt'
                        type='number'
                        onChange={handleChange}
                        placeholder='วันเกิด' style={{
                        width: '85%',
                    }}/>
                </Form.Item>
            </div>
          </div>

          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="เลขบัตรประชาชน" label="เลขบัตรประชาชน" rules={[{ required: true }, ]}>
                    <Input  
                        name='id_card'
                        onChange={handleChange}
                        placeholder='เลขบัตรประชาชน' style={{
                        width: '85%',
                }}/>
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item name="Line ID" label="Line ID" rules={[{ required: true }]}>
                    <Input
                        name='id_line'
                        type='number'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='Line ID'/>
                </Form.Item>
            </div>
          </div>
          
          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
                <Form.Item name="อีเมล" label="อีเมล" rules={[{ required: true }]}>
                    <Input 
                        name='email'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='อีเมล'/>
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item name="เบอร์โทรศัพท์" label="เบอร์โทรศัพท์" rules={[{ required: false }]}>
                    <Input
                        name='tel'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        // height: '120px',
                        }} placeholder='เบอร์โทรศัพท์'/>
                </Form.Item>
            </div>
          </div>
    
          
          <Button type="primary" htmlType='submit' style={{
                // background: "711DB0",
                // backgroundColor: "yellow"
              }} 
              onClick={handleNext}
              >
                ต่อไป
              </Button>
      </Form>
      )
    }
  
  export default RoomListPageAdd2;