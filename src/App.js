import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import store from "./redux/redux-store.ts";
import {Layout, ConfigProvider, theme as antdTheme} from "antd";
import 'antd/dist/reset.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import NotebookListContainer from "./components/Notebook/NotebookListContainer";
import NoteListContainer from "./components/Note/NoteListContainer";
import NoteEditorContainer from "./components/Note/NoteEditorContainer";
import Register from "./components/Login/Register";
import {ThemeProvider, useTheme} from "./contexts/ThemeContext";

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        return <AppWithTheme />;
    }
}

const AppWithTheme = () => {
    const { theme } = useTheme();
    const { defaultAlgorithm, darkAlgorithm } = antdTheme;
    const {Content} = Layout;

    return (
        <ConfigProvider theme={{
            algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
            components: {
                Table: {
                    headerBg: theme === 'dark' ? '#262626' : '#fafafa',
                    headerColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : '#262626',
                    colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#fff',
                    colorText: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : '#262626',
                    borderColor: theme === 'dark' ? '#434343' : '#f0f0f0',
                    rowHoverBg: theme === 'dark' ? '#262626' : '#f5f5f5',
                },
                Pagination: {
                    colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#fff',
                    colorText: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : '#262626',
                    itemActiveBg: theme === 'dark' ? '#1890ff' : '#1890ff',
                    itemLinkBg: theme === 'dark' ? '#1f1f1f' : '#fff',
                },
                Select: {
                    colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#fff',
                    colorText: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : '#262626',
                    colorBorder: theme === 'dark' ? '#434343' : '#d9d9d9',
                    colorBgElevated: theme === 'dark' ? '#1f1f1f' : '#fff',
                },
            },
        }}>
            <Layout>
                <HeaderContainer/>
                <Layout>
                    <Layout style={{padding: '12px 12px 12px'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: '0 50px',
                                margin: 0,
                                minHeight: 280,
                            }}>
                            <Routes>
                                <Route path='/' element={<NotebookListContainer/>}/>
                                <Route path='/notebooks' element={<NotebookListContainer/>}/>
                                <Route path='/notebooks/:notebookId/notes' element={<NoteListContainer/>}/>
                                <Route path='/notebooks/:notebookId/notes/:noteId' element={<NoteEditorContainer/>}/>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='/register' element={<Register/>}/>
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

const AppContainer = compose(
    connect(mapStateToProps, {initializeApp}))
(App);

const AppMain = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <BrowserRouter>
                    <AppContainer/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default AppMain