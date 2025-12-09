import React from "react";
import {NotebookType} from "../../redux/notebook-reducer";
import css from "./Notebooks.module.css";
import {Button, Card, Popconfirm, Typography, Tooltip} from "antd";
import {DeleteOutlined, ArrowRightOutlined, BookOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

type MapStatePropsType = {
    notebook: NotebookType
}

type MapDispatchPropsType = {
    onDeleteNotebook: (notebookId: string) => void
}

type NotebookCardType = MapStatePropsType & MapDispatchPropsType

const NotebookCard: React.FC<NotebookCardType> = ({notebook, onDeleteNotebook}) => {

    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/notebooks/${notebook.id}/notes`);
    }

    return (
        <div className={css.notebookCard}>
            <Card
                className={css.card}
                hoverable
                cover={
                    <div className={css.cardCover}>
                        <BookOutlined className={css.cardIcon} />
                    </div>
                }
                actions={[
                    <Tooltip title="Открыть блокнот">
                        <Button 
                            type="text" 
                            icon={<ArrowRightOutlined />} 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick();
                            }}
                        />
                    </Tooltip>,
                    <Tooltip title="Удалить блокнот">
                        <Popconfirm 
                            placement="top"
                            title={`Удалить блокнот "${notebook.name}"? Это действие нельзя отменить.`}
                            onConfirm={(e) => {
                                e?.stopPropagation();
                                onDeleteNotebook(notebook.id || '');
                            }}
                            onCancel={(e) => e?.stopPropagation()}
                            okText="Да"
                            cancelText="Нет"
                            okButtonProps={{ danger: true }}
                        >
                            <Button 
                                danger 
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </Popconfirm>
                    </Tooltip>
                ]}
            >
                <div onClick={handleCardClick} className={css.cardContent}>
                    <Title level={5} className={css.cardTitle} ellipsis={{ tooltip: notebook.name }}>
                        {notebook.name}
                    </Title>
                    {notebook.description && (
                        <Text 
                            type="secondary" 
                            className={css.cardDescription}
                            ellipsis={{ tooltip: notebook.description }}
                        >
                            {notebook.description}
                        </Text>
                    )}
                    {!notebook.description && (
                        <Text type="secondary" className={css.cardDescription}>
                            Нет описания
                        </Text>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default NotebookCard