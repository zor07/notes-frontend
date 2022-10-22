import React, {useEffect, useState} from "react";
import {Button, Form, Input, Typography} from 'antd';
import {NotebookType} from "../../redux/notebook-reducer";
import {FormOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import TextArea from "antd/es/input/TextArea";

const {Title} = Typography;

type NotebookFormType = {
    createNotebook: (payload: NotebookType) => void
}

const NotebookForm: React.FC<NotebookFormType> = ({createNotebook}) => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [notebook, setNotebook] = useState(null);

    const onFinish = (payload: NotebookType) => {
        setNotebook(payload)
        form.resetFields()
    };

    useEffect(() => {
        if (notebook !== null) {
            dispatch(createNotebook(notebook))
            setNotebook(null)
        }
    })

    return (
        <div>
            <Title level={5}>Create new Notebook</Title>
            <Form
                size={'middle'}
                form={form}
                name="notebookForm"
                layout={'horizontal'}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                onFinish={onFinish}
                autoComplete="off">

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please add name!',
                        },
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description">
                    <TextArea/>
                </Form.Item>

                <Form.Item>
                    <Button icon={<FormOutlined/>} type="primary" htmlType="submit">
                        Create new notebook
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )

}

export default NotebookForm;