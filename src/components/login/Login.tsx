import React, { ChangeEvent } from 'react'
import { Button, Image, Form, Input, message } from 'antd'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import AuthService from '../../services/auth.service';

interface LoginFormData {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        console.log('Failed:', formData);
      };
    
    const handleSubmit = async () => {
        try {  
            //   const response = await axios.post('http://localhost:3232/login', formData); // Replace with your API endpoint
            console.log(formData)
            const response = await AuthService.login(formData);
              if (response.status === 200) {
                console.log('Login successful:', response.data);
                // console.log('Test full_name', response.data['user']['full_name']);
                message.success('You have successfully registered your account!');

                // Handle successful registration (e.g., clear form, store token, redirect)
                // const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
                // await wait(2000);
                navigate('/home');
              }
              // Handle successful registration (e.g., clear form, redirect)
            } catch (error) {
                message.open({
                    type: 'error',
                    content: 'ussername or password is incorrect',
                    duration: 8
                  });
            }
            // console.log('Failed:', formData);
    }

  return (
    <div className="flex">
      <section className="w-full h-screen bg-purple-theme  justify-center hidden md:block">
        <section className="w-full   my-20 ">
          <div className="mb-10  mt-6 ">
            <h1 className='text-4xl text-center text-white font-extrabold'>For ManageRent</h1>
          </div>
          <div className=' text-center mx-5'>
              <div className='' style={{marginRight: 70, marginLeft: 70}}>
                  <Image 
                      src="public\picture\Screenshot 2024-03-05 162701.png"
                      // src="public\picture\Screenshot 2023-07-07 004901.png"
                  />
               </div>
          </div>
        </section>
      </section>
      <section className="w-full h-full content-center bg-white mb:w-1/2">
        <div className="w-full h-full  grid content-center px-20 my-20">
         
          <div className="justify-self-center text-3xl font-extrabold">
            Sign In
          </div>
          <div className="pt-10 pb-2">
          <Form 
            name="basic"
            layout='vertical'
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <Form.Item<LoginFormData>
                label="Username" 
                name={"username"}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder='username' 
                    style={{borderRadius: '5px', 
                        textSizeAdjust: 'auto',
                    }}
                    name='username'
                    onChange={handleChange}
                 />
            </Form.Item>
            <Form.Item<LoginFormData>
             label="Password"
             name='password'
             rules={[
                {required: true,message: 'Please input your password!'},
                // { min: 8, message: 'Password must be at least 8 characters long' },
                 ]}>
                <Input.Password placeholder='Password' 
                name='password'
                value={formData.password}
                onChange={handleChange}
                />
            </Form.Item>
            <div className='mt-4 mb-1 text-right'>
                <Link to="/forgotpw" className="text-purple-theme hover:text-blue-300 p-2">Forgot password?</Link>
                <Link to="/register" className="text-purple-theme hover:text-blue-300">Sign Up</Link>
            </div>
            <Form.Item>
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
                Sign In
            </Button>
            </Form.Item>
             
        </Form>
            
          </div>

        
        </div>
      </section>
    </div>
  )
}

export default Login