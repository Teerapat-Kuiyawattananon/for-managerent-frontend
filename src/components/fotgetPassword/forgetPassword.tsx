import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Input, message, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './ForgetPassword.css';
import AuthService from '../../services/auth.service';

interface ForgetPasswordFormData {
    email: string;
}


const ForgetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ForgetPasswordFormData>({
        email: '',
    });
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        console.log('Failed:', formData);
    };

    const handleSubmit = async () => {
        try {
            console.log("formData", formData);
            const response = await AuthService.forgotPassword(formData);
            if (response.status === 200) {
                console.log('Change password successful:', response);
                message.success('Send email successful! Please check your email to reset password');
                navigate('/login');
            }
        } catch (error) {
            message.open({
                type: 'error',
                content: 'Email not found! Please try again',
                duration: 8
            });
        }
    };



    return (
        <div className="flex">
            <section className="w-full h-screen bg-purple-theme justify-center hidden lg:block">
                <section className="w-full my-40">
                    <div className="mb-16 mt-6">
                        <h1 className='text-4xl text-center text-white font-extrabold'>For ManageRent</h1>
                    </div>
                    <div className='text-center mx-5'>
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
                <div className="w-full h-full grid content-center px-20 my-20">
                    <div className="justify-self-center text-3xl font-extrabold">
                        Forget password
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
                            <span style={{ marginTop: '', color: 'gray', fontSize: '12px' }}>
                                Please enter your registered email address and we will send you password reset instructions to this email.
                            </span>
                            <Form.Item<ForgetPasswordFormData>
                                label="Please Enter Email"
                                name='email'
                                rules={[
                                    { required: true, message: 'Please Enter Your Email!' },
                                ]}
                            >
                                <Input
                                    placeholder='Please Enter Email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <div className='mt-4 mb-1 text-right' style={{ marginBottom: '10px' }}>
                                <span style={{ marginRight: '10px' }}>
                                    Already have an account?
                                </span>
                                <Link to="/login" className="text-purple-theme hover:text-blue-300">Sign In</Link>
                            </div>
                            <Form.Item>
                                <Button type='primary'
                                    block
                                    htmlType='submit'
                                    style={{
                                        backgroundColor: '#711DB0',
                                        borderColor: 'black',
                                        width: '100%',
                                        height: '40px',
                                        textSizeAdjust: 'auto',
                                    }}
                                    className='hover:bg-white'
                                >
                                    Reset Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgetPassword;
