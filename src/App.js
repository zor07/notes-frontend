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
import ThemeLab from "./components/ThemeLab/ThemeLab";
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
    const { theme, darkPalette } = useTheme();
    const { defaultAlgorithm, darkAlgorithm } = antdTheme;
    const {Content} = Layout;
    const palette = darkPalette;

    return (
        <ConfigProvider theme={{
            algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
            components: {
                Table: {
                    headerBg: theme === 'dark' ? palette.surfaceElevated : '#fafafa',
                    headerColor: theme === 'dark' ? palette.textPrimary : '#262626',
                    colorBgContainer: theme === 'dark' ? palette.surface : '#fff',
                    colorText: theme === 'dark' ? palette.textPrimary : '#262626',
                    borderColor: theme === 'dark' ? palette.border : '#f0f0f0',
                    rowHoverBg: theme === 'dark' ? palette.selection : '#f5f5f5',
                },
                Pagination: {
                    colorBgContainer: theme === 'dark' ? palette.surface : '#fff',
                    colorText: theme === 'dark' ? palette.textPrimary : '#262626',
                    itemActiveBg: theme === 'dark' ? palette.accent : '#1890ff',
                    itemLinkBg: theme === 'dark' ? palette.surface : '#fff',
                },
                Select: {
                    colorBgContainer: theme === 'dark' ? palette.surface : '#fff',
                    colorText: theme === 'dark' ? palette.textPrimary : '#262626',
                    colorBorder: theme === 'dark' ? palette.border : '#d9d9d9',
                    colorBgElevated: theme === 'dark' ? palette.surface : '#fff',
                },
                Button: theme === 'dark' ? {
                    colorPrimary: palette.buttonPrimaryBg,
                    colorPrimaryHover: palette.buttonPrimaryBg,
                    colorPrimaryActive: palette.buttonPrimaryBg,
                    colorTextLightSolid: palette.buttonPrimaryText,
                } : {},
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
                                <Route path='/theme-lab' element={<ThemeLab/>}/>
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
