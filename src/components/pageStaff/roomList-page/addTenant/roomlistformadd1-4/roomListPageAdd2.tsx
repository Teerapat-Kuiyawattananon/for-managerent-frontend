import React, {useState} from 'react'
import {  InboxOutlined } from '@ant-design/icons';
import { Button, Form,  Upload, message, UploadProps } from 'antd';

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

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
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
          <Dragger {...props } >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">ลากไฟล์เพื่อ Upload รูปภาพบัตรประชาชน</p>
            <p className="ant-upload-hint">
              หรือเปิดไฟล์ภายในเครื่อง
            </p>
          </Dragger>
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

