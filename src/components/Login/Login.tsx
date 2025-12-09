import React, {useEffect} from "react";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {useNavigate, Link} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {Button, Form, Input, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    login: (username: string, password: string) => void
}

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

type LoginValuesType = {
    username: string
    password: string
}

const Login: React.FC<LoginPropsType>= ({isAuth, login}) => {
    const [form] = Form.useForm()
    const {Title} = Typography;
    const navigate = useNavigate();

    const onFinish = (values: LoginValuesType) => {
        login(values.username, values.password)
        form.resetFields()
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    })

    return (
        <div>
            <Title level={1}>Login</Title>
            <Form
                title={'Login'}
                size={'middle'}
                form={form}
                name="loginForm"
                layout={'horizontal'}
                labelCol={{
                    span: 3,
                }}
                wrapperCol={{
                    span: 4,
                }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <div style={{ marginTop: 8 }}>
                        No account? <Link to="/register">Register</Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);
