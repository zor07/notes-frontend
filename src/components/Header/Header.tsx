import React from "react";
import Navbar from "../Navbar/Navbar";
import {NotebookType} from "../../redux/notebook-reducer";
import {NoteType} from "../../redux/note-editor-reducer";
import {ThemeMode} from "../../theme/theme";

type HeaderPropsType = {
    isAuth: boolean
    username: string
    logout: () => void
    notebooks: NotebookType[] | null
    notebook: NotebookType | null
    note: NoteType | null
    theme: ThemeMode
    toggleTheme: () => void
}

const Header: React.FC<HeaderPropsType> = ({isAuth, username, logout, notebooks, notebook, note, theme, toggleTheme}) => {
    return (
        <>
            <Navbar isAuth={isAuth}
                    username={username}
                    logout={logout}
                    notebooks={notebooks}
                    notebook={notebook}
                    note={note}
                    theme={theme}
                    toggleTheme={toggleTheme}
            />
        </>
    )
}

export default Header