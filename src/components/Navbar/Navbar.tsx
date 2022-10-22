import React from 'react';
import {NavLink} from 'react-router-dom';
import {Avatar, Menu} from 'antd';
import {LoginOutlined, LogoutOutlined} from '@ant-design/icons';

type NavbarPropsType = {
    isAuth: boolean
    username: string
    logout: () => void
}

const Navbar: React.FC<NavbarPropsType> = ({isAuth, username, logout}) => {
    const SubMenu = Menu.SubMenu;
    return (
        <Menu theme='dark' mode='horizontal'>
            {isAuth &&
            <>
                <Menu.Item key='notebooks'>
                    <NavLink to='/notebooks'>Notes</NavLink>
                </Menu.Item>
                <SubMenu title={<div><Avatar src="https://joeschmoe.io/api/v1/random"/>  {username}</div>} style={{marginLeft: 'auto'}} key={'username'}>
                    <Menu.Item key='logout' icon={<LogoutOutlined/>} onClick={logout}>
                        Logout
                    </Menu.Item>
                </SubMenu>
            </>
            }

            {!isAuth &&
            <>
                <Menu.Item icon={<LoginOutlined/>} key='login'>
                    <NavLink to={'/login'}>Login</NavLink>
                </Menu.Item>
            </>
            }


        </Menu>
    )
}

export default Navbar