import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Input, message, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './changePassword.css';
import AuthService from '../../services/auth.service';

interface ChangePasswordFormData {
    password: string;
    passwordConfirm: string;
}


const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ChangePasswordFormData>({
        password: '',
        passwordConfirm: '',
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
            console.log(formData);
            const response = await AuthService.changePassword(formData);
            if (response.status === 200) {
                console.log('Change password successful:', response.data);
                message.success('You have successfully registered your account!');
                navigate('/register');
            }
        } catch (error) {
            message.open({
                type: 'error',
                content: 'Username or password is incorrect',
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
                        Reset password
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
                                Please enter your new password for reset your own password.
                            </span>
                            <Form.Item<ChangePasswordFormData>
                                label="Please Enter new password"
                                name='password'
                                rules={[
                                    { required: true, message: 'Please Enter new password!' },
                                    { min: 8, message: 'Password must be at least 8 characters long' },
                                ]}
                            >
                                <Input.Password
                                    placeholder='Please Enter new password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item<ChangePasswordFormData>
                                label="Please Confirm new password"
                                name='passwordConfirm'
                                rules={[
                                    { required: true, message: 'Please Confirm new password!' },
                                    { min: 8, message: 'Password must be at least 8 characters long' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                          if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                          }
                                          return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                      }),
                                ]}
                            >
                                <Input.Password
                                    placeholder='Please Confirm new password'
                                    name='confirmPassword'
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            {/* <div className='mt-4 mb-1 text-right' style={{ marginBottom: '10px' }}>
                                <span style={{ marginRight: '10px' }}>
                                    Already have an account?
                                </span>
                                <Link to="/login" className="text-purple-theme hover:text-blue-300">Sign In</Link>
                            </div> */}
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

export default ChangePassword;
