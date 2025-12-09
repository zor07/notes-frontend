import React from "react";
import {Button, Form, Input, Space} from 'antd';
import {NotebookType} from "../../redux/notebook-reducer";
import {FormOutlined} from "@ant-design/icons";

const { TextArea } = Input;

type NotebookFormType = {
    createNotebook: (payload: NotebookType) => void
}

const NotebookForm: React.FC<NotebookFormType> = ({createNotebook}) => {
    const [form] = Form.useForm()

    const onFinish = (payload: NotebookType) => {
        createNotebook(payload)
        form.resetFields()
    };

    return (
        <Form
            size={'middle'}
            form={form}
            name="notebookForm"
            layout={'vertical'}
            onFinish={onFinish}
            autoComplete="off"
            style={{ marginTop: 24 }}
        >
            <Form.Item
                label="Название"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, укажите название блокнота!',
                    },
                    {
                        max: 100,
                        message: 'Название не должно превышать 100 символов',
                    }
                ]}>
                <Input placeholder="Введите название блокнота" />
            </Form.Item>

            <Form.Item
                label="Описание"
                name="description"
                rules={[
                    {
                        max: 500,
                        message: 'Описание не должно превышать 500 символов',
                    }
                ]}>
                <TextArea 
                    rows={4} 
                    placeholder="Добавьте описание (необязательно)"
                    showCount
                    maxLength={500}
                />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                <Space>
                    <Button icon={<FormOutlined/>} type="primary" htmlType="submit">
                        Создать блокнот
                    </Button>
                    <Button onClick={() => form.resetFields()}>
                        Очистить
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )

}

export default NotebookForm;