import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {Avatar, Breadcrumb, Dropdown, Menu, Switch, Space, Typography} from 'antd';
import {HomeOutlined, LoginOutlined, LogoutOutlined, BulbOutlined} from '@ant-design/icons';
import {NotebookType} from "../../redux/notebook-reducer";
import {NoteType} from "../../redux/note-editor-reducer";
import {ThemeMode} from "../../theme/theme";

import css from './Navbar.module.css'

type NavbarPropsType = {
    isAuth: boolean
    username: string
    logout: () => void
    notebooks: NotebookType[] | null
    notebook: NotebookType | null
    note: NoteType | null
    theme: ThemeMode
    toggleTheme: () => void
}

const Navbar: React.FC<NavbarPropsType> = ({isAuth, username, logout, notebooks, notebook, note, theme, toggleTheme}) => {
    const SubMenu = Menu.SubMenu;
    const location = useLocation()

    let breadCrumbs;

    const userMenu = (
        <Menu>
            <Menu.Item key='logout' icon={<LogoutOutlined/>} onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    )

    const notebooksLinks = notebooks.map(it =>
        <Menu.Item key={`notebookMenu${it.id}`}>
            <NavLink key={`notebook${it.id}`} to={`/notebooks/${it.id}/notes`}>{it.name}</NavLink>
        </Menu.Item>
    )
    const notebooksMenu = <Menu>
        {notebooksLinks}
    </Menu>



    if (location.pathname.match('\/notebooks\/?$') || location.pathname === '/') {
        breadCrumbs = <Breadcrumb separator={""}>
            <Breadcrumb.Item href="" key='profile'>
                <Dropdown overlay={userMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Avatar src="https://joeschmoe.io/api/v1/random"/> {username}
                    </a>
                </Dropdown>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item href="" key='notebooks'>
                <NavLink to='/notebooks'><HomeOutlined/> Notebooks</NavLink>
            </Breadcrumb.Item>
        </Breadcrumb>
    } else if (location.pathname.match('\/notebooks\/[0-9]+\/notes\/?$')) {
        breadCrumbs = <Breadcrumb separator={""}>
            <Breadcrumb.Item href="" key='profile'>
                <Dropdown overlay={userMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Avatar src="https://joeschmoe.io/api/v1/random"/> {username}
                    </a>
                </Dropdown>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item href="" key='notebooks'>
                <NavLink to='/notebooks'><HomeOutlined/> Notebooks</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item href="" overlay={notebooksMenu} key='notes'>
                <NavLink to={`/notebooks/${notebook.id}/notes`}>{notebook.name}</NavLink>
            </Breadcrumb.Item>
        </Breadcrumb>
    } else if (location.pathname.match('\/notebooks\/[0-9]+\/notes\/?\/[0-9]+\/?$')) {
        breadCrumbs = <Breadcrumb separator={""}>
            <Breadcrumb.Item href="" key='profile'>
                <Dropdown overlay={userMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Avatar src="https://joeschmoe.io/api/v1/random"/> {username}
                    </a>
                </Dropdown>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item href="" key='notebooks'>
                <NavLink to='/notebooks'><HomeOutlined/> Notebooks</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item href="" overlay={notebooksMenu} key='notes'>
                <NavLink to={`/notebooks/${notebook.id}/notes`}>{notebook.name}</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item href="" key='note'>
                {note.title}
            </Breadcrumb.Item>
        </Breadcrumb>
    }



    return (
        <Menu theme={theme === 'dark' ? 'dark' : 'light'} mode='horizontal' className={css.navbar}>
            <div className={css.navContent}>
                <div className={css.left}>
                    {isAuth &&
                        <>
                            {breadCrumbs}
                        </>
                    }

                    {!isAuth &&
                        <>
                            <Breadcrumb>
                                <Breadcrumb.Item href="" key='profile'>
                                    <Menu.Item icon={<LoginOutlined/>} key='login'>
                                        <NavLink to={'/login'}>Login</NavLink>
                                    </Menu.Item>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </>
                    }
                </div>
                <div className={css.right}>
                    <Space align="center">
                        <BulbOutlined />
                        <Switch checked={theme === 'dark'} onChange={() => toggleTheme()} size="small" />
                        <Typography.Text>{theme === 'dark' ? 'Dark' : 'Light'}</Typography.Text>
                    </Space>
                </div>
            </div>
        </Menu>
    )
}

export default Navbar