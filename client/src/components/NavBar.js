import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate} from 'react-router-dom';
import {Context} from '../index';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts"
import { observer } from "mobx-react-lite"


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate  = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE} style={{color: '#fff'}}>КупиДевайс</NavLink>
                {
                    user.isAuth ? 
                    <Nav className="ml-auto">
                        <Button onClick={() => navigate(ADMIN_ROUTE)} variant="outline-light">Админ панель</Button>
                        <Button onClick={() => logOut()} variant="outline-light" className="ms-2">Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
});

export default NavBar;