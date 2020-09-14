import React, { useState } from "react";
import { Form, Input, Button, Typography, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../Auth";




const { Title } = Typography;

function Login(props) {
  const { history, isloggedin } = props;
  const [loading, setloading] = useState(false)

  const onFinish = (values) => {
      setloading(true)
      login(values, () => {
        setloading(false)
        isloggedin(history);
      });
  };



  return (
    <div className="container" >
      <Form
        name="form"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Title level={2} > Login Form </Title>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username or Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username Or Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
       
        <Form.Item>
          <Spin spinning={loading}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Spin>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;