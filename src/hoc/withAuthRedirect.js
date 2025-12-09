import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            if (props.initialized && !props.isAuth) {
                navigate("/login")
            }
        }, [props.initialized, props.isAuth, navigate])

        return <Component {...props} />
    }

    let mstp = (state) => ({
        initialized: state.app.initialized,
        isAuth: state.auth.isAuth
    })

    return  connect(mstp)(Wrapper);
}


