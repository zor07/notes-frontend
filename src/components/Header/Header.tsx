import React from "react";
import Navbar from "../Navbar/Navbar";
import {NotebookType} from "../../redux/notebook-reducer";
import {NoteType} from "../../redux/note-editor-reducer";

type HeaderPropsType = {
    isAuth: boolean
    username: string
    logout: () => void
    notebook: NotebookType | null
    note: NoteType | null
}

const Header: React.FC<HeaderPropsType> = ({isAuth, username, logout, notebook, note}) => {
    return (
        <>
            <Navbar isAuth={isAuth}
                    username={username}
                    logout={logout}
                    notebook={notebook}
                    note={note}
            />
        </>
    )
}

export default Header