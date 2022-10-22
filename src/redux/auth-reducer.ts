import {AUTH_API} from "../api/api";
import Cookies from 'universal-cookie';
import {isTokenExpired} from "../api/apiUtils";

type UserDataType = {
    id: string | null,
    name: string | null,
    username: string | null,
    isAuth: boolean
}

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: UserDataType
}

const initialState: UserDataType = {
    id: null,
    name: null,
    username: null,
    isAuth: false
}

const SET_USER_DATA = "AUTH/SET_USER_DATA"

const authReducer = (state: UserDataType = initialState, action: SetUserDataActionType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

const setUserData = (id: string | null,
                     name: string | null,
                     username: string | null,
                     isAuth: boolean): SetUserDataActionType => ({type: SET_USER_DATA, payload: {id, name, username, isAuth}})

export const login = (username: string, password: string) => {
    return async (dispatch: Function) => {
        const response = await AUTH_API.login(username, password);
        if (response.status === 200) {
            updateCookies(response.data.access_token, response.data.refresh_token)
            dispatch(me())
        }
    }
}

export const logout = () => {
    return (dispatch: Function) => {
        dispatch(setUserData(null, null, null, false));
        updateCookies(null, null)
    }
}

export const me = () => {
    return async (dispatch: Function) => {
        const response = await AUTH_API.me()
        if (response.status === 200) {
            dispatch(setUserData(response.data.id, response.data.name, response.data.username, true))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
        }

    }
}

export const refreshToken = () => {
    return async (dispatch: Function) => {
        const response = await AUTH_API.refreshAccessToken()
        if (response.status === 200) {
            updateCookies(response.data.access_token, response.data.refresh_token)
            dispatch(me())
        }
    }
}

const updateCookies = (accessToken: string | null, refreshToken: string | null): void => {
    const cookies = new Cookies();
    cookies.set('accessToken', accessToken, {path: '/'});
    cookies.set('refreshToken', refreshToken, {path: '/'});
}

export default authReducer;