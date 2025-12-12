import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {useNavigate, useParams} from "react-router-dom";
import Editor from "../Editor/Editor";
import {PrimitiveSelection, RemirrorJSON} from "remirror";
import {Button, message, Tabs} from "antd";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {useDebouncedCallback} from "use-debounce";
import {getNote, NoteType, saveNote, unmountNote} from "../../redux/note-editor-reducer";
import {clearCreatedNoteId, createNewNote, NoteIdAndTitleType, requestNotes} from "../../redux/notes-reducer";
import css from './Note.module.css'
import {PlusOutlined} from "@ant-design/icons";


type MapStatePropsType = {
    note: NoteType | null,
    notes: Array<NoteIdAndTitleType>
    createdNoteId: string | null
}

type MapDispatchPropsType = {
    saveNote: (notebookId: string, note: NoteType) => void
    getNote: (notebookId: string, noteId: string) => void
    requestNotes: (notebookId: string) => void
    unmountNote: () => void
    createNewNote: (notebookId: string) => void
    clearCreatedNoteId: () => void
}


type NoteContainerPropsType = MapStatePropsType & MapDispatchPropsType

const NoteEditorContainer: React.FC<NoteContainerPropsType> = (props) => {

    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [note, setNote] = useState(props.note)
    const [currentNoteId, setCurrentNoteId] = useState(params.noteId)
    const [isCreatingNote, setIsCreatingNote] = useState(false)
    const [pendingCreatedNoteId, setPendingCreatedNoteId] = useState<string | null>(null)

    useEffect(() => {
        if (params.notebookId && params.noteId) {
            dispatch(getNote(params.notebookId, params.noteId));
            dispatch(requestNotes(params.notebookId))
        }
    }, [dispatch, params.notebookId, params.noteId])

    useEffect(() => {
        return () => {
            dispatch(unmountNote())
        }
    }, [dispatch])

    useEffect(() => {
        if (note !== props.note) {
            dispatch(saveNote(params.notebookId, note))
            setTimeout(() => {
                // TODO describe types in reducers, and return promise from dispatch
                dispatch(requestNotes(params.notebookId))
            }, 250)
        }
    }, [note])


    useEffect(() => {
        if (currentNoteId && currentNoteId !== params.noteId && params.notebookId) {
            dispatch(getNote(params.notebookId, currentNoteId));
            navigate(`/notebooks/${params.notebookId}/notes/${currentNoteId}`)
        }
    }, [currentNoteId, dispatch, navigate, params.notebookId, params.noteId])

    useEffect(() => {
        if (isCreatingNote && params.notebookId) {
            dispatch(createNewNote(params.notebookId))
        }
    }, [dispatch, isCreatingNote, params.notebookId])

    useEffect(() => {
        if (props.createdNoteId && params.notebookId) {
            setPendingCreatedNoteId(props.createdNoteId)
            setIsCreatingNote(false)
            dispatch(clearCreatedNoteId())
            dispatch(requestNotes(params.notebookId))
        }
    }, [dispatch, params.notebookId, props.createdNoteId])

    useEffect(() => {
        if (pendingCreatedNoteId && params.notebookId && props.notes.some(noteItem => noteItem.id === pendingCreatedNoteId)) {
            setCurrentNoteId(pendingCreatedNoteId)
            navigate(`/notebooks/${params.notebookId}/notes/${pendingCreatedNoteId}`)
            setPendingCreatedNoteId(null)
        }
    }, [navigate, params.notebookId, pendingCreatedNoteId, props.notes])

    const handleTabChange = (selectedNoteId) => {
        debounced.cancel();
        setCurrentNoteId(selectedNoteId)
    }
    const handleCreateNote = () => {
        if (!isCreatingNote) {
            setIsCreatingNote(true)
        }
    }

    const {TabPane} = Tabs;

    const [editorState, setEditorState] = useState(null);
    const [shouldAutoSave, setShouldAutoSave] = useState(false)
    const [shouldSaveImmediately, setShouldSaveImmediately] = useState(false)

    const saveContent = (content: RemirrorJSON, selection: PrimitiveSelection, title: string) => {
        if (!title || title === '') {
            alert('Please add title!')
        } else {
            const newNote = {
                id: params.noteId,
                title: title,
                data: {
                    content, selection
                },
                notebookDto: {
                    id: params.notebookId,
                    name: '',
                    description: ''
                }
            }

            setNote(newNote)
        }
    }

    const save = (content: RemirrorJSON, selection: PrimitiveSelection, title: string) => {
        if (shouldAutoSave || shouldSaveImmediately) {
            saveContent(content, selection, title)
            message.info('Saved')
        }
    }
    const debounced = useDebouncedCallback(
        (document, selection, title, save) => {
            save(document, selection, title)
        },
        // delay in ms
        13000
    );

    // Manual save
    useEffect(() => {
        if (shouldSaveImmediately) {
            const currSelection = getCurrSelection()
            const title = getTitle()
            if (title) {
                save(editorState.doc as unknown as RemirrorJSON, currSelection, title)
            } else {
                message.warning('Please add title')
            }
            setShouldSaveImmediately(false)
            setShouldAutoSave(false)
            debounced.cancel()
        }
    }, [shouldSaveImmediately]);

    // Auto save
    useEffect(() => {
        if (shouldAutoSave) {
            const currSelection = getCurrSelection()
            const title = getTitle()
            if (title) {
                debounced(editorState.doc, currSelection, title, save.bind(this));
            }
            setShouldAutoSave(false)
        }
    }, [shouldAutoSave]);

    const getTitle = (): string | undefined => {
        const titleNode = editorState.doc.nodeAt(1)
        if (titleNode && titleNode.text) {
            return titleNode.text
        } else return undefined
    }

    const getCurrSelection = (): PrimitiveSelection => {
        return {
            anchor: editorState.selection.anchor,
            head: editorState.selection.head
        }
    }


    return (
        <div className={css.content}>
            <Tabs activeKey={params.noteId}
                  tabPosition={'right'}
                  onChange={handleTabChange}
                  className={css.noteTabs}
                  style={{height: "max-content"}}
                  tabBarExtraContent={
                      <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          block
                          onClick={handleCreateNote}
                          loading={isCreatingNote}
                          className={css.addNoteButton}
                      >
                          Добавить запись
                      </Button>
                  }>
                {props.notes.map(noteItem => (
                    <TabPane tab={noteItem.title}
                             key={noteItem.id}>
                        <Editor selection={props.note.data.selection}
                                content={props.note.data.content}
                                setEditorState={setEditorState}
                                setShouldAutoSave={setShouldAutoSave}
                                setShouldSaveImmediately={setShouldSaveImmediately}/>
                    </TabPane>
                ))}
            </Tabs>


        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        note: state.noteEditor.note,
        notes: state.notes.notes,
        createdNoteId: state.notes.createdNoteId
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        saveNote,
        getNote,
        requestNotes,
        unmountNote,
        createNewNote,
        clearCreatedNoteId
    })
)(NoteEditorContainer);
