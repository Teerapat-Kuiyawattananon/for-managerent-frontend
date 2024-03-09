import { Form, Input, Button, Select , message, Upload } from 'antd'
import axios from 'axios'
import type { UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, {useState} from 'react'
import ApartmentService from '../../../../services/apartment.service'

interface FormBankAccountData {
    apartment_id: number
    bank_name: string
    bank_account_name: string
    bank_account_number: string
}

interface FormBankAccountProps {
    next: () => void
    prev: () => void
    currentState: number
    valueData : any
}



const FormBankAccount = ({next, prev, currentState, valueData} : FormBankAccountProps) => {
    // const [formData, setFormData] = useState<FormBankAccount>(
    //     {
    //         apartment_id: 0,
    //         bank_name: '',
    //         bank_account_name: '',
    //         bank_account_number: ''
    //     }
    // );

    const [formData, setFormData] = useState<FormBankAccountData>(valueData.form3);
    const [fileUp, setFileUp] = useState<File>()
    const props: UploadProps = {
      name: 'file',
      action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        setFileUp(info.file.originFileObj)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

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
        console.log(formData)
      }
    
    const handleSelectChange = (value: any) => {
        console.log(`selected ${value}`);
        setFormData({
            ...formData,
            bank_name: value
        })
        // console.log(formData)
      }

      const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        // console.log("test")
        // e.preventDefault()
        try {  
            //   const response = await axios.post('http://localhost:3232/login', formData); // Replace with your API endpoint
            // console.log(formData)
            // e.preventDeafault()
            // e.preventDefault()
            valueData.form3 = formData
            const response = await axios.post('http://localhost:3232/apartments', valueData);
            console.log('response in FormBankAccount', response.data)
            if (response.status === 200) {
                console.log('Success:', formData);
                const apartment_id = response.data.data.id
                valueData.form1.apartment_id = apartment_id
                console.log("apartment_id", apartment_id)

                if (apartment_id === 0 || apartment_id === undefined || apartment_id === null || fileUp === undefined) { 
                  // upload file
                  message.error('ไม่สารถเพิ่มรูปภาพได้')
                  next()
                  return
                }
                const formImageData = new FormData()
                formImageData.append('info', "QRCODE")
                formImageData.append('files', fileUp)
                try {
                  const resImage = await ApartmentService.uploadImage(Number(apartment_id), formImageData)
                  console.log('resImage', resImage)
                  if (resImage.status === 200) {
                    message.success('เพิ่มรูปภาพสำเร็จ');
                    next()
                  }
                }
                catch (error) {
                  console.log('Failed:', formData);
                }
                next()
                    // Handle successful registration (e.g., clear form, redirect)
                } else {
                    console.log('Failed:', formData);
                
            }
            // console.log('response in FormBankAccount', response.data)
            // console.log('valueData in FormBankAccount', valueData)
            // console.log('Success:', formData);
            // next()
              // Handle successful registration (e.g., clear form, redirect)
            } catch (error) {
              console.log('Failed:', formData);
              console.log('valueData in FormBankAccount', valueData)
            }
            // console.log('Failed:', formData);
    }
    
     const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      console.log('Failed:', formData);
    }

    const formRef = React.useRef();

    return (
        <>
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
        <Form.Item 
        // initialValue={valueData.form3.bank_account_name}
        name="ชื่อบัญชีธนาคาร" label="ชื่อบัญชีธนาคาร" rules={[{ required: true }]}>
        <Input 
        name='bank_account_name'
        onChange={handleChange}
        defaultValue={valueData.form3.bank_account_name}
        style={{
          width: '85%',
          
        }} placeholder='ชื่อบัญชีธนาคาร'/>
      </Form.Item>
        </div>
        <div className='w-1/2 h-1'>

        <Form.Item 
        // initialValue={valueData.form3.bank_name}
        name="ชื่อธนาคาร" label="ชื่อธนาคาร" rules={[{ required : true }]}>
          <Select style={{
            width: '85%'
          }}
          onChange={handleSelectChange}
          {...valueData.form3.bank_name === '' ? null : {defaultValue: valueData.form3.bank_name}}
          placeholder="ชื่อธนาคาร">
            <Select.Option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</Select.Option>
            <Select.Option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</Select.Option>
            <Select.Option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</Select.Option>
            <Select.Option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</Select.Option>
            <Select.Option value="ธนาคารกรุงศรี">ธนาคารกรุงศรี</Select.Option>
            <Select.Option value="ธนาคารทหารไทย">ธนาคารทหารไทย</Select.Option>
            <Select.Option value="ธนาคารออมสิน">ธนาคารออมสิน</Select.Option>
            <Select.Option value="ธนาคารยูโอบี">ธนาคารยูโอบี</Select.Option>
            <Select.Option value="ธนาคารทิสโก้">ธนาคารทิสโก้</Select.Option>
            <Select.Option value="ธนาคารเกียรตินาคิน">ธนาคารเกียรตินาคิน</Select.Option>
          </Select>
        </Form.Item>
        </div>
      </div>
      <div className='flex  justify-start mt-4'>
        <div className='w-1/2 mr-3'>
            <Form.Item name="เลขที่บัญชี" label="เลขที่บัญชี" rules={[{ required: true }]}>
          <Input 
          name='bank_account_number'
          onChange={handleChange}
          defaultValue={valueData.form3.bank_account_number}
          placeholder='เลขที่บัญชี'
            style={{
            width: '85%',
          }} />
        </Form.Item>
        </div>
      </div>

      <div className='flex  justify-start mt-4'>
        <div className='w-1/2 mr-3 mb-5'>
          <Upload {...props} >
              <Button type="primary" icon={<UploadOutlined />}>เพิ่มรูป QR CODE บัญชีธนาคาร</Button>
          </Upload>
        </div>
      </div>
      <Button type="primary" htmlType='submit' style={{
            // background: "711DB0",
            // backgroundColor: "yellow"
          }} 
          onClick={handleNext}
          >
            เสร็จสิ้น
        </Button>
        <Button style={{ margin: '0 8px', background: "gray" , color: "white"}} onClick={() => prev()}>
            ย้อนกลับ
        </Button>
    
  </Form>
  
  </>
    )
}

export default FormBankAccount