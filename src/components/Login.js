import 'antd/dist/antd'; 
import './Login.css'; 
import { Form, Input } from "antd"; 
import { Button, Checkbox} from 'antd';
import { Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        // Check if 'account' is defined and contains '@'
        if (values.account?.includes('@')) {
            axios.post('http://localhost:8080/users/add', {
                name: values.username,
                password: values.password,
                email: values.account  
            })
            .then(response => {
                console.log('User registered:', response.data);
                alert("Account created successfully. Please log in.");
                navigate('/register');
            })
            .catch(error => {
                if (error.response) {
                    console.log('Error status:', error.response.status);
                    console.log('Error data:', error.response.data);
                    if (error.response.status === 500) { 
                        alert("A user with the given email already exists, please try with another email"); 
                    } else {
                        alert("An error occurred during registration. Please try again later.");
                    }
                } else {
                    alert("No response received. Server may be down. Please check your network connection and try again.");
                }
            });
            
        } else {
            alert("Invalid email address. Please enter a valid email.");
        }
    };
    

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='backGround'>
            <Form
                className='form'
                name="basic"
                labelCol={{ span: 24 }}  
                wrapperCol={{ span: 24 }}  
                style={{ maxWidth: 700 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Title className="signUp">Sign up</Title>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="account"
                    key="account"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="Email Address" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ span: 24 }}  
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}> 
                    <Button className="centeredButton" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
