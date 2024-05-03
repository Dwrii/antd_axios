import 'antd/dist/antd'; 
import './Login.css'; 
import './Home';
import { Form, Input } from "antd"; 
import { Button, Checkbox} from 'antd';
import { Typography } from "antd";
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login1() {
  const navigate = useNavigate();
  
  const onFinish = (values) => {
    console.log('Received values of form:', values);
    
    // POST request to check username and password
    axios.get('http://localhost:8080/users/getByNameAndPassword', {
        params: {
            name: values.username,
            password: values.password
        }
    })
    .then(response => {
        console.log('Login successful:', response.data);
        navigate('/home'); // Navigate to Home page on successful login
    })
    .catch(error => {
        console.error('Login failed:', error);
        alert("Login failed. Please check your username and password, Or make an account if you have not yet done so.");
    });
};

      return (
        <div className='backGround'>
        
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
        <Typography.Title
            className="Login">
            Welcome!
        </Typography.Title>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
    
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/login">register now!</Link>
          </Form.Item>
        </Form>
        </div>
      );
};

export default Login1;