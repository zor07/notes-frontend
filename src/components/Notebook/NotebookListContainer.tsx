import React, {useEffect, useState, useMemo} from "react";
import {createNotebook, deleteNotebook, NotebookType, requestNotebooks} from "../../redux/notebook-reducer";
import {Input, Button, Modal, Typography, Space} from "antd";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from "./Notebooks.module.css";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import NotebookForm from "./NotebookForm";
import NotebookCard from "./NotebookCard";
import {SearchOutlined, PlusOutlined, BookOutlined} from "@ant-design/icons";

const {Title} = Typography;

type MapStatePropsType = {
    notebooks: Array<NotebookType>
}

type MapDispatchPropsType = {
    requestNotebooks: () => void
    deleteNotebook: (notebookId: string) => void
    createNotebook: (notebook: NotebookType) => void
}


type NotebookListContainerType = MapStatePropsType & MapDispatchPropsType

const NotebookListContainer: React.FC<NotebookListContainerType> = (props) => {
    const [deleteNotebookId, setDeleteNotebookId] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestNotebooks())
    }, [])

    useEffect(() => {
        if (deleteNotebookId !== '') {
            dispatch(deleteNotebook(deleteNotebookId))
            setDeleteNotebookId('')
        }
    }, [deleteNotebookId])

    const onDeleteNotebook = (notebookId: string) => {
        setDeleteNotebookId(notebookId)
    }

    const filteredNotebooks = useMemo(() => {
        if (!searchQuery.trim()) {
            return props.notebooks;
        }
        const query = searchQuery.toLowerCase();
        return props.notebooks.filter(notebook => 
            notebook.name.toLowerCase().includes(query) ||
            (notebook.description && notebook.description.toLowerCase().includes(query))
        );
    }, [props.notebooks, searchQuery]);

    const handleCreateNotebook = (notebook: NotebookType) => {
        props.createNotebook(notebook);
        setIsModalVisible(false);
    }

    const notebookCards = filteredNotebooks.map(notebook => {
        return (
            <NotebookCard 
                key={notebook.id}
                notebook={notebook}
                onDeleteNotebook={onDeleteNotebook}
            />
        )
    })

    return (
        <div className={css.content}>
            <div className={css.header}>
                <Title level={2} className={css.headerTitle}>
                    Мои блокноты
                </Title>
                <Space>
                    <Input
                        placeholder="Поиск блокнотов..."
                        prefix={<SearchOutlined />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={css.searchContainer}
                        allowClear
                    />
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                        size="large"
                    >
                        Создать блокнот
                    </Button>
                </Space>
            </div>

            {notebookCards.length > 0 ? (
                <div className={css.notebooksGrid}>
                    {notebookCards}
                </div>
            ) : (
                <div className={css.emptyState}>
                    {props.notebooks.length === 0 ? (
                        <>
                            <BookOutlined className={css.emptyStateIcon} />
                            <Title level={4} className={css.emptyStateTitle}>
                                У вас пока нет блокнотов
                            </Title>
                            <p className={css.emptyStateDescription}>
                                Создайте свой первый блокнот, чтобы начать сохранять заметки
                            </p>
                            <Button 
                                type="primary" 
                                icon={<PlusOutlined />}
                                onClick={() => setIsModalVisible(true)}
                                size="large"
                            >
                                Создать блокнот
                            </Button>
                        </>
                    ) : (
                        <>
                            <BookOutlined className={css.emptyStateIcon} />
                            <Title level={4} className={css.emptyStateTitle}>
                                Ничего не найдено
                            </Title>
                            <p className={css.emptyStateDescription}>
                                Попробуйте изменить поисковый запрос
                            </p>
                            <Button onClick={() => setSearchQuery('')}>
                                Очистить поиск
                            </Button>
                        </>
                    )}
                </div>
            )}

            <Modal
                title="Создать новый блокнот"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={600}
            >
                <NotebookForm createNotebook={handleCreateNotebook} />
            </Modal>
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        notebooks: state.notebooks.notebooks
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        requestNotebooks,
        deleteNotebook,
        createNotebook
    })
)(NotebookListContainer);