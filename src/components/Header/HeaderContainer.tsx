import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {NotebookType} from "../../redux/notebook-reducer";
import {NoteType} from "../../redux/note-editor-reducer";



type MapStatePropsType = {
    isAuth: boolean
    username: string
    notebooks: NotebookType[] | null
    notebook: NotebookType | null
    note: NoteType | null
}

type MapDispatchPropsType = {
    logout: () => void
}

type OwnPropsType = {}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        username: state.auth.username,
        notebooks: state.notebooks.notebooks,
        notebook: state.notes.notebook,
        note: state.noteEditor.note
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {logout})(HeaderContainer);