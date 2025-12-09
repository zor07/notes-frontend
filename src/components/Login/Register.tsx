import React, {useEffect} from "react";
import {connect} from "react-redux";
import {register} from "../../redux/auth-reducer";
import {useNavigate, Link} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {Button, Form, Input, Typography} from "antd";
import {LockOutlined, UserOutlined, IdcardOutlined} from "@ant-design/icons";

type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    register: (username: string, password: string, name: string) => void
}

type RegisterPropsType = MapStateToPropsType & MapDispatchToPropsType

type RegisterValuesType = {
    username: string
    password: string
    passwordConfirm: string
    name: string
}

const usernamePattern = /^[A-Za-z][A-Za-z0-9._-]*$/;

const Register: React.FC<RegisterPropsType>= ({isAuth, register}) => {
    const [form] = Form.useForm();
    const {Title} = Typography;
    const navigate = useNavigate();

    const onFinish = (values: RegisterValuesType) => {
        register(values.username, values.password, values.name);
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    });

    return (
        <div>
            <Title level={1}>Register</Title>
            <Form
                title={'Register'}
                size={'middle'}
                form={form}
                name="registerForm"
                layout={'horizontal'}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 6 }}
                onFinish={onFinish}
                autoComplete="off">

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: 'Please input your Name!' },
                        { min: 1, max: 100, message: 'Name must be between 1 and 100 characters'}
                    ]}>
                    <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="Your name" />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        { required: true, message: 'Please input your Username!' },
                        { min: 3, max: 50, message: 'Username must be between 3 and 50 characters'},
                        { pattern: usernamePattern, message: 'Start with a letter, use letters/digits/._-' }
                    ]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: 'Please input your Password!' },
                        { min: 6, max: 100, message: 'Password must be between 6 and 100 characters'}
                    ]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="passwordConfirm"
                    label="Confirm"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your Password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match'));
                            },
                        }),
                    ]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm password" />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 6, offset: 4 }}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                    <div style={{ marginTop: 8 }}>
                        Already have an account? <Link to="/login">Log in</Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {register})(Register);

