import React, {useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {Breadcrumb, Dropdown, Menu, Switch, Space, Typography, Tooltip} from 'antd';
import {HomeOutlined, LoginOutlined, LogoutOutlined, BulbOutlined, UserOutlined} from '@ant-design/icons';
import {NotebookType} from "../../redux/notebook-reducer";
import {NoteType} from "../../redux/note-editor-reducer";
import {useTheme} from "../../contexts/ThemeContext";
import ThemeLab from "../ThemeLab/ThemeLab";

import css from './Navbar.module.css'

const {Text} = Typography;

type NavbarPropsType = {
    isAuth: boolean
    username: string
    logout: () => void
    notebooks: NotebookType[] | null
    notebook: NotebookType | null
    note: NoteType | null
}

const Navbar: React.FC<NavbarPropsType> = ({isAuth, username, logout, notebooks, notebook, note}) => {
    const location = useLocation()
    const { theme, toggleTheme, darkPalette } = useTheme()
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)

    let breadCrumbs;

    const userMenu = {
        items: [
            {
                key: 'logout',
                icon: <LogoutOutlined/>,
                label: 'Logout',
                onClick: logout
            }
        ]
    }

    const notebooksMenu = {
        items: notebooks.map(it => ({
            key: `notebookMenu${it.id}`,
            label: <NavLink key={`notebook${it.id}`} to={`/notebooks/${it.id}/notes`}>{it.name}</NavLink>
        }))
    }



    if (location.pathname.match('\/notebooks\/?$') || location.pathname === '/') {
        breadCrumbs = <Breadcrumb separator={""}>
            <Breadcrumb.Item href="" key='profile'>
                <Dropdown menu={userMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <Space size={8} align="center" className={css.userTrigger}>
                                <span className={css.userIcon}><UserOutlined /></span>
                                <Text>{username}</Text>
                            </Space>
                    </a>
                </Dropdown>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item href="" key='notebooks'>
                <NavLink to='/notebooks'><HomeOutlined/> Note Desk</NavLink>
            </Breadcrumb.Item>
        </Breadcrumb>
    } else if (location.pathname.match('\/notebooks\/[0-9]+\/notes\/?$')) {
        breadCrumbs = <Breadcrumb separator={""}>
            <Breadcrumb.Item href="" key='profile'>
                <Dropdown menu={userMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Space size={8} align="center" className={css.userTrigger}>
                            <span className={css.userIcon}><UserOutlined /></span>
                            <Text>{username}</Text>
                        </Space>
                    </a>
                </Dropdown>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item href="" key='notebooks'>
                <NavLink to='/notebooks'><HomeOutlined/> Note Desk</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item href="" menu={notebooksMenu} key='notes'>
                <NavLink to={`/notebooks/${notebook.id}/notes`}>{notebook.name}</NavLink>
            </Breadcrumb.Item>
        </Breadcrumb>
    } else if (location.pathname.match('\/notebooks\/[0-9]+\/notes\/?\/[0-9]+\/?$')) {
        breadCrumbs = <Breadcrumb separator={""}>
            <Breadcrumb.Item href="" key='profile'>
                <Dropdown menu={userMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Space size={8} align="center" className={css.userTrigger}>
                            <span className={css.userIcon}><UserOutlined /></span>
                            <Text>{username}</Text>
                        </Space>
                    </a>
                </Dropdown>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item href="" key='notebooks'>
                <NavLink to='/notebooks'><HomeOutlined/> Note Desk</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item href="" menu={notebooksMenu} key='notes'>
                <NavLink to={`/notebooks/${notebook.id}/notes`}>{notebook.name}</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item href="" key='note'>
                {note.title}
            </Breadcrumb.Item>
        </Breadcrumb>
    }



    const bulbTooltip = theme === 'dark' ? 'Нажми меня' : 'Включи меня';
    const handleBulbClick = () => {
        if (theme === 'dark') {
            setIsThemeModalOpen(true)
        }
    }

    return (
        <Menu
            theme={theme === 'dark' ? 'dark' : 'light'}
            mode='horizontal'
            className={css.navbar}
            style={theme === 'dark' ? { background: darkPalette.navbarBg } : undefined}
        >
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
                        <Tooltip title={bulbTooltip}>
                            <span
                                className={`${css.bulbWrapper} ${theme === 'dark' ? css.bulbOn : ''}`}
                                onClick={handleBulbClick}
                                role="button"
                                aria-label="Открыть настройки темы"
                            >
                                <BulbOutlined className={css.bulbIcon}/>
                            </span>
                        </Tooltip>
                        <Switch checked={theme === 'dark'} onChange={toggleTheme} size="small" />
                        <Text>{theme === 'dark' ? 'Dark' : 'Light'}</Text>
                    </Space>
                </div>
            </div>
            <ThemeLab open={isThemeModalOpen} onRequestClose={() => setIsThemeModalOpen(false)} />
        </Menu>
    )
}

export default Navbar
