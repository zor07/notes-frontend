import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {NotebookType} from "../../redux/notebook-reducer";
import {NoteType} from "../../redux/note-editor-reducer";
import {applyTheme, ThemeMode} from "../../theme/theme";



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

type HeaderContainerState = {
    theme: ThemeMode
}

class HeaderContainer extends React.Component<HeaderContainerPropsType, HeaderContainerState> {

    constructor(props: HeaderContainerPropsType) {
        super(props);
        this.state = { theme: 'light' };
    }

    async componentDidMount() {
        await applyTheme(this.state.theme);
    }

    async componentDidUpdate(_: HeaderContainerPropsType, prevState: HeaderContainerState) {
        if (prevState.theme !== this.state.theme) {
            await applyTheme(this.state.theme);
        }
    }

    toggleTheme = () => {
        this.setState(({ theme }) => ({ theme: theme === 'light' ? 'dark' : 'light' }));
    }

    render() {
        return <Header {...this.props}
                       theme={this.state.theme}
                       toggleTheme={this.toggleTheme}/>
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