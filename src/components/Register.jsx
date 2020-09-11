import React from 'react';
import { Form, Input, Typography, Button } from 'antd'; 
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { register } from "../Auth";


const { Title } = Typography;

export default function Register(props) {
    const { history } = props;
    console.log(history)

    const onFinish = (values) => {
        
        register(values, () => {
            history.push("/login")
        })
    };


    return (
        <div className="container">
            <Form name="form" onFinish={onFinish} >
                <Title level={2} > Registration Form </Title>

                <Form.Item name="username"  rules={[
                    {
                        required: true,
                        messgae: "Please Enter a Username"
                    }
                ]}
                >
                    <Input 
                        prefix={ <UserOutlined /> }
                        placeholder="Username" 
                    />
                </Form.Item>

                <Form.Item name="email"  rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]} 
                >
                    <Input 
                        prefix={ <MailOutlined /> }  
                        placeholder="Email" 
                    />
                </Form.Item>

                <Form.Item 
                    name="password" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        }
                    ]} 
                >
                    <Input.Password 
                        prefix={ <LockOutlined /> } 
                        placeholder="Password" 
                    />
                </Form.Item>

                <Form.Item name="confirm" 
                    dependencies={['password']} 
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}  
                >
                    <Input.Password 
                        prefix={ <LockOutlined /> }  
                        placeholder="Comfirm Password" 
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="register-form-button" > Register </Button>
                Already have an account? <a href="/login">Log In</a>
            
            </Form>
        </div>
    );
}
