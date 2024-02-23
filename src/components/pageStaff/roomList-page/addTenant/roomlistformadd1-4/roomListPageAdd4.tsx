import React, {useState} from 'react'
import { Button, Form, Input, InputNumber, Space, DatePicker } from 'antd';

interface RoomListPageAdd4Props {
    next : () => void
    currentState: number
  }

  interface RoomListPageAdd4State {
    name: string
    lastname: string
    nickname: string
    birthday: number
    id_card: number
    id_line: string
    email: string
    tel: string
  }

const RoomListPageAdd4= ({next, currentState} : RoomListPageAdd4Props)  => {
    const [formData, setFormData] = useState<RoomListPageAdd4State>({
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
        <Form >
          
      </Form>
      )
    }
  
  export default RoomListPageAdd4;