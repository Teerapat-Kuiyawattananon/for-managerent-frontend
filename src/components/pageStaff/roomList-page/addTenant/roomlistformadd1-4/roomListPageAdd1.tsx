import React, {useState} from 'react'
import { Button, Form, Input, InputNumber, Space, DatePicker } from 'antd';

interface RoomListPageAdd1Props {
    next : () => void
    currentState: number
  }

  interface RoomListPageAdd1State {
    name: string
    lastname: string
    nickname: string
    birthday: number
    id_card: number
    id_line: string
    email: string
    tel: string
  }

const RoomListPageAdd1= ({next, currentState} : RoomListPageAdd1Props)  => {
    const [formData, setFormData] = useState<RoomListPageAdd1State>({
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
      }
    
      const handleChange = (e: any) => {
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
      }
    
      
    
      const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
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
                <Form.Item name="ชื่อจริง" label="ชื่อจริง" rules={[{ required: true }]}>
                    <Input 
                        name='name'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='ชื่อจริง'/>
                </Form.Item>
            </div>
            <div className='w-1/2 h-1'>
                <Form.Item name="นามสกุล" label="นามสกุล" rules={[{ required: true }]}>
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
                <Form.Item name="เบอร์โทรศัพท์" label="เบอร์โทรศัพท์" rules={[{ required: true }]}>
                    <Input
                        name='tel'
                        onChange={handleChange}
                        style={{
                        width: '85%',
                        }} placeholder='เบอร์โทรศัพท์'/>
                </Form.Item>
            </div>
          </div>
    
          
          <Button type="primary" htmlType='submit' style={{
              }} 
              onClick={handleNext}
              >
                ต่อไป
              </Button>
      </Form>
      )
    }
  
  export default RoomListPageAdd1;

