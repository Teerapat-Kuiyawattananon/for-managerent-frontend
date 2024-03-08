import React, {useState} from 'react'
import { Button, Form, Input, InputNumber, Space, DatePicker } from 'antd';

interface Form1ApartmentProps {
  next : () => void
  currentState: number
  valueData : any
}

interface Form1ApartmentState {
  name: string
  address: string
  contact_number: string
  number_of_floor: number
  number_of_room: number
  rent_amount: number
  water_unit_price: number
  information: string
  electricity_unit_price: number
  late_bill_price: number
  bill_date: Date
  late_bill_free_day: number
}

interface Room {
  id: number;
  floor_name: string;
  room_name: string;
  rent_amount: number;
}

interface Floor {
  id: number;
  floor_name: string;
  rooms: Room[];
}

const Form1Apartment = ({next, currentState, valueData} : Form1ApartmentProps) => {
  // const [formData, setFormData] = useState<Form1ApartmentState>({
  //   name: '',
  //   address: '',
  //   contact_number: '',
  //   number_of_floor: 0,
  //   number_of_room: 0,
  //   rent_amount: 0,
  //   water_unit_price: 0,
  //   information: '',
  //   electricity_unit_price: 0,
  //   late_bill_price: 0,
  //  bill_date: new Date(),
  //   late_bill_free_day: 0
  // })

  const [formData, setFormData] = useState<Form1ApartmentState>(valueData.form1)

  const formRef = React.useRef();
  const handleNext = () => {
    console.log(currentState)
    // next()
  }

  const handleChange = (e: any) => {
    console.log(e.target.type)
    console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value
    })

    console.log("valueData", valueData)
  }

  

  const handleSubmit = async (values : any) => {
    // console.log("test")
    // e.preventDefault()
    try {  
        //   const response = await axios.post('http://localhost:3232/login', formData); // Replace with your API endpoint
        // console.log(formData)
        // e.preventDeafault()
        // e.preventDefault()
        valueData.form1 = formData
        valueData.form1.bill_date = new Date(values['รอบวันที่เรียกเก็บเงิน'].format('YYYY-MM-DD'))
        const FLOORS: Floor[] = [];
        for (let i = 1; i <= valueData.form1.number_of_floor ; i++) {
          let RoomData: Room[] = [];
          for (let j = 1; j <= valueData.form1.number_of_room; j++) {
              RoomData.push({
                  id: j,
                  floor_name: `${i}`,
                  room_name: `${i}${j.toString().padStart(2, '0')}`,
                  rent_amount: valueData.form1.rent_amount,
                });
          }
          FLOORS.push({
              id: i,
              floor_name: `${i}`,
              rooms: RoomData
          });
        }
        valueData.form2 = FLOORS
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
  console.log("valueData", valueData)
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
        <Form.Item name="ชื่อหอพัก" label="ชื่อหอพัก" rules={[{ required: true }]}>
        <Input 
        name='name'
        onChange={handleChange}
        style={{
          width: '85%',
          
        }} placeholder='ชื่อหอพัก'/>
      </Form.Item>
        </div>
        <div className='w-1/2 h-1'>
        <Form.Item name="ที่อยู่" label="ที่อยู่" rules={[{ required: true }]}>
        <Input.TextArea 
          name='address'
          onChange={handleChange}
          style={{
            width: '85%',
            // height: '120px',
          
          }} placeholder='ที่อยู่'/>
          </Form.Item>
        </div>
      </div>
      <div className='flex  justify-start mt-4'>
        <div className='w-1/2 mr-3'>
            <Form.Item name="age" label="เบอร์ติดต่อพอหัก" rules={[{ required: true }]}>
          <Input 
          name='contact_number'
          onChange={handleChange}
          placeholder='เบอร์ติดต่อพอหัก'
            style={{
            width: '85%',
          }} />
        </Form.Item>
        </div>
        <div className='w-1/2'>
          <Form.Item name="จำนวนห้องพักสูงสุดในแต่ละชั้น" label="จำนวนห้องพักสูงสุดในแต่ละชั้น" 
          rules={[{ required: true },
          // {type: 'number', min: 0, max: 99}
          ]}>
          <Input  
          name='number_of_room'
          type='number'
          onChange={handleChange}
          placeholder='จำนวนห้องพักสูงสุดในแต่ละชั้น' style={{
            width: '85%',
          }}/>
        </Form.Item>
        </div>
      </div>
      
      <div className='flex  justify-start'>
        <div className='w-1/2 mr-3'>
            <Form.Item name="จำนวนชั้น" label="จำนวนชั้น" 
            rules={[{ required: true },
            ]}>
        <Input  
        name='number_of_floor'
        type='number'
        onChange={handleChange}
        placeholder='จำนวนชั้น' style={{
          width: '85%',
        }}/>
      </Form.Item>
        </div>
        <div className='w-1/2'>
        <Form.Item 
        name="ค่าไฟราคาต่อหน่วย" label="ค่าไฟราคาต่อหน่วย" rules={[{ required: true }]}>
        <Input
        name='electricity_unit_price'
        type='number'
        onChange={handleChange}
        style={{
          width: '85%',
        }} placeholder='ค่าไฟราคาต่อหน่วย'/>
      </Form.Item>
        </div>
      </div>
      
      <div className='flex  justify-start'>
        <div className='w-1/2 mr-3'>
            <Form.Item name="ค่าน้ำราคาต่อหน่วย" label="ค่าน้ำราคาต่อหน่วย" rules={[{ required: true }]}>
        <Input 
        name='water_unit_price'
        type='number'
        onChange={handleChange}
        style={{
          width: '85%',
        }} placeholder='ค่าน้ำราคาต่อหน่วย'/>
      </Form.Item>
        </div>
        <div className='w-1/2'>
        <Form.Item name="หมายเหตุ" label="หมายเหตุ" rules={[{ required: false }]}>
        <Input.TextArea 
        name='information'
        onChange={handleChange}
        style={{
          width: '85%',
          // height: '120px',
          
        }} placeholder='หมายเหตุ สำหรับสร้างบิล'/>
      </Form.Item>
        </div>
      </div>

      <div className='flex  justify-start'>
        <div className='w-1/2 mr-3'>
              <Form.Item name="ค่าเช่ารายเดือน" label="ค่าเช่ารายเดือน" rules={[{ required: true }]}>
          <Input 
          name='rent_amount'
          type='number'
          onChange={handleChange}
          style={{
            width: '85%',
          }} placeholder='ค่าเช่ารายเดือน'/>
        </Form.Item>
        </div>
        <div className='w-1/2'>
        <Form.Item name="ค่าปรับจ่ายบิลล่าช้า/วัน" label="ค่าปรับจ่ายบิลล่าช้า/วัน" rules={[{ required: true }]}>
          <Input 
          name='late_bill_price'
          type='number'
          onChange={handleChange}
          style={{
            width: '85%',
          }} placeholder='ค่าปรับจ่ายบิลล่าช้า/วัน'/>
        </Form.Item>
        </div>
      </div>
      
      
      <div className='flex  justify-start'>
        <div className='w-1/2 mr-3'>
            <Form.Item name="รอบวันที่เรียกเก็บเงิน" label="รอบวันที่เรียกเก็บเงิน" rules={[{ required: true }]}>
        <DatePicker 
        // name='bill_date'
        // onChange={handleChange}
        style={{
          width: '85%',
        }} placeholder='รอบวันที่เรียกเก็บเงิน'/>
      </Form.Item>
        </div>
        <div className='w-1/2'>
         <Form.Item name="หลังออกบิลแล้วจ่ายบิลโดยไม่เสียค่าปรับได้กี่วัน" label="หลังออกบิลแล้วจ่ายบิลโดยไม่เสียค่าปรับได้กี่วัน" rules={[{ required: true }]}>
        <Input  
        name='late_bill_free_day'
        type='number'
        onChange={handleChange}
        style={{
          width: '85%',
        }} placeholder='หลังออกบิลแล้วจ่ายบิลโดยไม่เสียค่าปรับได้กี่วัน'/>
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

export default Form1Apartment