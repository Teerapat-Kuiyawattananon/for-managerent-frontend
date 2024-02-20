import React, {useState} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form,  Upload,} from 'antd';

interface RoomListPageAdd2Props {
    next : () => void
    currentState: number
  }

  interface RoomListPageAdd2State {
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

const RoomListPageAdd2= ({next, currentState} : RoomListPageAdd2Props)  => {
    const [formData, setFormData] = useState<RoomListPageAdd2State>({
      
      })
    
      const formRef = React.useRef();
      const handleNext = () => {
        console.log(currentState)
      }
    
      // const handleChange = (e: any) => {
      //   // console.log(e.target.type)
      //   // console.log(e.target.value)
      //   setFormData({
      //     ...formData,
      //     [e.target.name]:
      //       e.target.type === "number" ? Number(e.target.value) : e.target.value
      //   })
      // }
    
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
        <Form.Item label="ลากไฟล์เพื่อ upload รูปภาพบัตรประชาชนหรือเปิดไฟล์ภายในเครื่อง" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true }]} >
            <Upload action="/upload.do" listType="picture-card" >
              <button style={{ border: 0, background: 'none'  }} type="button" >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

        <Button type="primary" htmlType='submit' style={{
            }} 
            onClick={handleNext}
            >
              ต่อไป
            </Button>
    </Form>
    )
  }
  
  export default RoomListPageAdd2;

