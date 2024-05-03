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
        // Perform email validation here
        if (values.account.includes('@')) {
            // Send data to Spring Boot server
            axios.post('http://localhost:8080/users/add', {
                name: values.username,
                password: values.password,
                email: values.account  
            })
            .then(response => {
                console.log('User registered:', response.data);
                alert("Account Made, Login again to access");
                navigate('/register'); 
            })
            .catch(error => {
                console.error('Error registering user:', error);
                alert("An error occurred during registration.");
            });
        } else {
            alert("Sorry, the Email Address is not valid. Please try something else.");
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
