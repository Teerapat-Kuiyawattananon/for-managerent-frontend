import React, {useState} from 'react'
import { Button, Form, Input,  DatePicker } from 'antd';

interface RoomListPageAdd1Props {
    next : () => void
    currentState: number
    valueData : any
  }

  interface RoomListPageAdd1State {
    name: string
    last_name: string
    nick_name: string
    birth_day: Date
    id_card_number: string
    line_id: string
    email: string
    mobile_number: string
  }

const RoomListPageAdd1= ({next, currentState, valueData} : RoomListPageAdd1Props)  => {
    const [formData, setFormData] = useState<RoomListPageAdd1State>({
        name: '',
        last_name: '',
        nick_name: '',
        birth_day: new Date(),
        id_card_number: '',
        line_id: '',
        email: '',
        mobile_number: '',
      })
    
      const formRef = React.useRef();
      const handleNext = () => {
        // next()
        console.log(currentState)
      }
    
      const handleChange = (e: any) => {
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
      }

      const testDateTime = (e: any) => {
        console.log(e.target.value, e.target.type)
      }
    
      
    
      const handleSubmit = async (values: any) => {
        try {  
            valueData.form1.full_name = formData.name + " " + formData.last_name
            valueData.form1.username = formData.email
            valueData.form1.birth_day = new Date(values['วันเกิด'].format('YYYY-MM-DD'))
            console.log('1:', valueData);
            valueData.form1 = {...valueData.form1, ...formData}
            console.log('2:', valueData.form1);
            console.log('Success:', formData);
            console.log("valueData", valueData)
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
                        name='last_name'
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
                <Form.Item name="ชื่อเล่น" label="ชื่อเล่น" rules={[{ required: false }]}>
                    <Input 
                        name='nick_name'
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
                        // name='birth_day'
                        // type='date'
                        // onChange={testDateTime}
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
                        name='id_card_number'
                        onChange={handleChange}
                        placeholder='เลขบัตรประชาชน' style={{
                        width: '85%',
                }}/>
                </Form.Item>
            </div>
            <div className='w-1/2'>
                <Form.Item name="Line ID" label="Line ID" rules={[{ required: true }]}>
                    <Input
                        name='line_id'
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
                        name='mobile_number'
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
              {/* <Button onClick={handleNext} > sss</Button> */}
      </Form>
      )
    }
  
  export default RoomListPageAdd1;

