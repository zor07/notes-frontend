import React from "react";
import Navbar from "../Navbar/Navbar";

type HeaderPropsType = {
    isAuth: boolean
    username: string
    logout: () => void
}

const Header: React.FC<HeaderPropsType> = ({isAuth, username, logout}) => {
    return (
        <>
            <div className="logo">
                Notes
            </div>
            <Navbar isAuth={isAuth} username={username} logout={logout}/>
        </>
    )
}

export default Header