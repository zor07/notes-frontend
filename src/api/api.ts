import axios from "axios";
import Cookies from "universal-cookie";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV.toString()
})

const cookies = new Cookies()

export type ErrorResponse = {
    error_message: string | null
}

export type ResponseType<T> = {
    status: number
    data: T
} & ErrorResponse

export const AUTH_API = {
    login(username, password) {
        return instance.post(`auth/login`, {username, password})
    },
    me() {
        return instance.get(`auth/me`, auth()).catch((error) => {
            return handleError(error)
        })
    },
    refreshAccessToken() {
        return instance.get(`auth/token/refresh`, {
            headers: {
                "Authorization": `Bearer ${cookies.get("refreshToken")}`
            }
        })
    },
    register(username, password, name) {
        return instance.post(`auth/register`, {username, password, name})
    }
}

export const NOTES_API = {
    getNotes(notebookId) {
        return instance.get(`notebooks/${notebookId}/notes`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    getNote(notebookId, noteId) {
        return instance.get(`notebooks/${notebookId}/notes/${noteId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    createNote(notebookId, note) {
        return instance.post(`notebooks/${notebookId}/notes`, note, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    updateNote(notebookId, note) {
        return instance.put(`notebooks/${notebookId}/notes`, note, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteNote(notebookId, noteId) {
        return instance.delete(`notebooks/${notebookId}/notes/${noteId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const NOTEBOOKS_API = {
    getNotebook(notebookId) {
        return instance.get(`notebooks/${notebookId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    getNotebooks() {
        return instance.get('notebooks', auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    createNotebook(notebook) {
        return instance.post('notebooks', notebook, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    updateNotebook(notebook) {
        return instance.put('notebooks', notebook, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteNotebook(notebookId) {
        return instance.delete(`notebooks/${notebookId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}

const auth = () => {
    return getAuthConfig(cookies.get("accessToken"))
}

const getAuthConfig = (accessToken) => {
    return {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
}

const handleError = (error) => {
    if (error.response && error.response.status === 403) {
        return error.response
    } else {
        console.error(error)
    }
}