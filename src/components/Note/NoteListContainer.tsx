import React, {useEffect, useState, useMemo} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {Button, Input, Popconfirm, Typography, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, FileTextOutlined, ArrowLeftOutlined} from "@ant-design/icons";
import css from './Note.module.css'
import {
    clearCreatedNoteId,
    createNewNote,
    deleteNote,
    NoteIdAndTitleType,
    requestNotes, unmountNotes
} from "../../redux/notes-reducer";
import {NotebookType} from "../../redux/notebook-reducer";

type MapStatePropsType = {
    notes: Array<NoteIdAndTitleType>
    notebook: NotebookType
    createdNoteId: string | null
}

type MapDispatchPropsType = {
    requestNotes: (notebookId: string) => void
    deleteNote: (notebookId: string, noteId: string) => void
    createNewNote: (notebookId: string) => void
    clearCreatedNoteId: () => void
    unmountNotes: () => void
}

type OwnPropsType = {}

type NotesListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const NoteListContainer: React.FC<NotesListContainerPropsType> = (props) => {
    const {Title, Text} = Typography;
    const params = useParams()
    const [deleteNoteId, setDeleteNoteId] = useState('')
    const [isCreatingNewNoteId, setIsCreatingNewNoteId] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.notebookId) {
            dispatch(requestNotes(params.notebookId))
        }
        return () => {
            dispatch(unmountNotes())
        }
    }, [dispatch, params.notebookId])

    useEffect(() => {
        if (params.notebookId) {
            dispatch(requestNotes(params.notebookId))
        }
    }, [dispatch, params.notebookId])

    useEffect(() => {
        if (props.notebook && props.notebook.id) {
            dispatch(requestNotes(props.notebook.id))
            if (props.createdNoteId) {
                setIsCreatingNewNoteId(false)
                const newId = props.createdNoteId
                dispatch(clearCreatedNoteId())
                navigate(`/notebooks/${props.notebook.id}/notes/${newId}`)
            }
        }
    }, [dispatch, navigate, props.createdNoteId, props.notebook])

    useEffect(() => {
        if (deleteNoteId !== '') {
            dispatch(deleteNote(props.notebook.id, deleteNoteId))
            setDeleteNoteId('')
        }
    }, [dispatch, deleteNoteId, props.notebook.id])

    useEffect(() => {
        if (isCreatingNewNoteId) {
            dispatch(createNewNote(props.notebook.id))
        }
    }, [dispatch, isCreatingNewNoteId, props.notebook.id])

    const onCreateNewNote = () => {
        setIsCreatingNewNoteId(true)
    }

    const onDeleteNote = (noteId: string) => {
        setDeleteNoteId(noteId)
    }

    const handleNoteClick = (noteId: string) => {
        navigate(`/notebooks/${props.notebook.id}/notes/${noteId}`)
    }

    const filteredNotes = useMemo(() => {
        if (!searchQuery.trim()) {
            return props.notes;
        }
        const query = searchQuery.toLowerCase();
        return props.notes.filter(note => 
            note.title.toLowerCase().includes(query)
        );
    }, [props.notes, searchQuery]);

    return (
        <div className={css.content}>
            <div className={css.header}>
                <div className={css.headerLeft}>
                    <Button 
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/notebooks')}
                        className={css.backButton}
                    >
                        Назад к блокнотам
                    </Button>
                    <div className={css.titleSection}>
                        <Title level={2} className={css.pageTitle}>
                            {props.notebook.name || 'Записи'}
                        </Title>
                        {props.notebook.description && (
                            <Text type="secondary" className={css.notebookDescription}>
                                {props.notebook.description}
                            </Text>
                        )}
                    </div>
                </div>
                <Space>
                    <Input
                        placeholder="Поиск записей..."
                        prefix={<SearchOutlined />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={css.searchInput}
                        allowClear
                    />
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={onCreateNewNote}
                        loading={isCreatingNewNoteId}
                        size="large"
                    >
                        Новая запись
                    </Button>
                </Space>
            </div>

            {filteredNotes.length > 0 ? (
                <div className={css.tableContainer}>
                    <Table
                        dataSource={filteredNotes}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Всего записей: ${total}`,
                            pageSizeOptions: ['10', '20', '50', '100'],
                        }}
                        onRow={(record) => ({
                            onClick: () => handleNoteClick(record.id),
                            className: css.tableRow,
                        })}
                        className={css.notesTable}
                        columns={[
                            {
                                title: 'Название записи',
                                dataIndex: 'title',
                                key: 'title',
                                ellipsis: {
                                    showTitle: false,
                                },
                                render: (text: string) => (
                                    <div className={css.titleCell}>
                                        <FileTextOutlined className={css.titleIcon} />
                                        <span className={css.titleText} title={text}>
                                            {text}
                                        </span>
                                    </div>
                                ),
                            },
                            {
                                title: 'Действия',
                                key: 'actions',
                                width: 150,
                                align: 'right',
                                render: (_: any, record: NoteIdAndTitleType) => (
                                    <Space size="small" onClick={(e) => e.stopPropagation()}>
                                        <Tooltip title="Редактировать">
                                            <Button
                                                type="text"
                                                icon={<EditOutlined />}
                                                onClick={() => handleNoteClick(record.id)}
                                                className={css.actionButton}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Удалить">
                                            <Popconfirm
                                                placement="left"
                                                title={`Удалить запись "${record.title}"? Это действие нельзя отменить.`}
                                                onConfirm={() => onDeleteNote(record.id)}
                                                okText="Да"
                                                cancelText="Нет"
                                                okButtonProps={{ danger: true }}
                                            >
                                                <Button
                                                    danger
                                                    type="text"
                                                    icon={<DeleteOutlined />}
                                                    className={css.actionButton}
                                                />
                                            </Popconfirm>
                                        </Tooltip>
                                    </Space>
                                ),
                            },
                        ]}
                    />
                </div>
            ) : (
                <div className={css.emptyState}>
                    {props.notes.length === 0 ? (
                        <>
                            <FileTextOutlined className={css.emptyStateIcon} />
                            <Title level={4} className={css.emptyStateTitle}>
                                В этом блокноте пока нет записей
                            </Title>
                            <Text type="secondary" className={css.emptyStateDescription}>
                                Создайте первую запись, чтобы начать работу
                            </Text>
                            <Button 
                                type="primary" 
                                icon={<PlusOutlined />}
                                onClick={onCreateNewNote}
                                loading={isCreatingNewNoteId}
                                size="large"
                                style={{ marginTop: 24 }}
                            >
                                Создать запись
                            </Button>
                        </>
                    ) : (
                        <>
                            <FileTextOutlined className={css.emptyStateIcon} />
                            <Title level={4} className={css.emptyStateTitle}>
                                Ничего не найдено
                            </Title>
                            <Text type="secondary" className={css.emptyStateDescription}>
                                Попробуйте изменить поисковый запрос
                            </Text>
                            <Button onClick={() => setSearchQuery('')} style={{ marginTop: 24 }}>
                                Очистить поиск
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        notes: state.notes.notes,
        notebook: state.notes.notebook,
        createdNoteId: state.notes.createdNoteId
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestNotes, deleteNote, createNewNote, clearCreatedNoteId, unmountNotes})
)(NoteListContainer);
