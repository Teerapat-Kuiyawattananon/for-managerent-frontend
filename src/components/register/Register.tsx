import React, { ChangeEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Form, Button, Flex, Checkbox, message } from 'antd'
import axios from 'axios'
import './Register.css'

interface RegisterFormData {
    full_name: string;
    email: string;
    mobile_number: string;
    username: string;
    password: string;
    confirmPassword: string;
    termsAgreed?: boolean;
}

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<RegisterFormData>({
        full_name: '',
        email: '',
        mobile_number: '',
        username: '',
        password: '',
        confirmPassword: '',
        termsAgreed: false,
    });

    
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData, 
        [event.target.name]: event.target.value
    })
    console.log(formData)
    }
    const onFinish = async (values: any) => {
        try {
          // Replace this with your actual registration logic and API call
          console.log('Registration successful:', values);
            setFormData({
                full_name: values['full_name'],
                email: values['email'],
                username: values['email'],
                mobile_number: values['mobile_number'],
                password: values['password'],
                confirmPassword: values['confirmPassword'],
                termsAgreed: values['termsAgreed'],
            })
          console.log('test', formData)
          // Handle successful registration (e.g., clear form, redirect)
        } catch (error) {
          console.error('Registration failed:', error);
        }
      };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        console.log('Failed:', formData);
      };
    
    const handleSubmit = async () => {
    
        try {  
        formData.username = formData.email;
          const response = await axios.post('http://localhost:3232/test', formData); // Replace with your API endpoint
          if (response.status === 200) {
            console.log('Registration successful:', response.data);
            message.success('You have successfully registered your account!');
            navigate('/home');
            // Handle successful registration (e.g., clear form, redirect)
          } else if (response.status === 400){
            console.error('Registration failed:', response.data);
            message.open({
                type: 'error',
                content: 'Email ของท่านมีผู้ใช้แล้ว',
                duration: 8
              });
            setFormData({
              ...formData,
              email: '',
            })
          }
          // Handle successful registration (e.g., clear form, redirect)
        } catch (error) {
            message.open({
                type: 'error',
                content: 'Email ของท่านมีผู้ใช้แล้ว',
                duration: 8
              });
            setFormData({
              ...formData,
              email: '',
            })
        }
      };
    
  return (
    <div className="flex">
      <section className="w-full h-screen bg-purple-theme  justify-center hidden md:block">
        <section className="w-full   my-20 ">
          <div className="mb-10  mt-6 ">
            <h1 className='text-4xl text-center text-white font-extrabold'>For ManageRent</h1>
          </div>
          <div className='bg-gray-500 text-center mx-5'>
                <div>
                    test
                </div>
          </div>
        </section>
      </section>
      <section className="w-full h-1/2 content-center bg-white mb:w-1/2">
        <div className="w-full h-full  grid content-center px-20 my-20">
         
          <div className="justify-self-center text-3xl font-extrabold">
            Create Your Account
          </div>
          <div className="pt-10 ">
          <Form 
            name="basic"
            layout='vertical'
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <Form.Item<RegisterFormData>
                label="Your Name" 
                name="full_name"
                hasFeedback
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input placeholder='Your Name' 
                    style={{borderRadius: '5px', 
                        textSizeAdjust: 'auto',
                    }}
                    name='full_name'
                    onChange={handleChange}
                    value={formData.full_name}
                    // required
                 />
            </Form.Item>
            <Form.Item<RegisterFormData>
                 label="Your Email"
                 name='email'
                 hasFeedback
                //  valuePropName='email'
                 rules={[{
                    required: true,
                    type: 'email',
                    message: 'Please input your email!'
                 }]} >
                <Input placeholder='Your Email' 
                // value={formData.email}
                name='email'
                onChange={handleChange}
                />
            </Form.Item>
            <Form.Item<RegisterFormData>
                 label="Tel."
                 name='mobile_number'
                 hasFeedback
                 rules={[{
                    required: true,
                    message: 'Please input your phone number!'
                 }]}>
                <Input placeholder='Tel.' 
                name='mobile_number'
                onChange={handleChange}
                />
            </Form.Item>
            <Form.Item<RegisterFormData>
             label="Your Password"
             name='password'
             hasFeedback
             rules={[
                {required: true,message: 'Please input your password!'},
                { min: 8, message: 'Password must be at least 8 characters long' },
                 ]}>
                <Input.Password placeholder='Password' 
                name='password'
                value={formData.password}
                onChange={handleChange}
                />
            </Form.Item>
            <Form.Item<RegisterFormData>
             label="Confirm Password"
             name='confirmPassword'
             hasFeedback
             dependencies={['password']}
             rules={[
                {required: true, message: 'Please confirm your password!'},
                { min: 8, message: 'Password must be at least 8 characters long' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),]}>
                <Input.Password placeholder='Confirm Password' 
                    name='confirmPassword'
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    />
            
            </Form.Item>
            <Form.Item  
                style={{
                    padding : 0,
                    margin: 0,
                    marginBottom: -1,
                }}>
                <Checkbox checked={formData.termsAgreed} onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}>
                    I have read and agree to the <a href="#">Terms of Service</a>
                </Checkbox>
            </Form.Item>
            <Form.Item >
            <Button type='primary' 
                block
                htmlType='submit'
                style={{backgroundColor: '#711DB0', 
                    borderColor: 'black', 
                    width: '100%', 
                    height: '40px',
                    textSizeAdjust: 'auto',
                 }}
                className='hover:bg-white'
            >
                Register
            </Button>
            </Form.Item>
             
        </Form>
            
          </div>
                 <div className='text-center text-gray-500'>
                  already have an account? <Link to="/login" className="text-purple-theme hover:text-blue-300">Login</Link>
                 </div>
        
        </div>
      </section>
    </div>
  )
}

export default Register