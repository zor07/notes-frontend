import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import store from "./redux/redux-store.ts";
import {Layout} from "antd";
import 'antd/dist/antd.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import NotebookListContainer from "./components/Notebook/NotebookListContainer";
import NoteListContainer from "./components/Note/NoteListContainer";
import NoteEditorContainer from "./components/Note/NoteEditorContainer";

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        const {Content} = Layout;
        return (
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
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

const AppContainer = compose(
    connect(mapStateToProps, {initializeApp}))
(App);

const AppMain = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}

export default AppMain