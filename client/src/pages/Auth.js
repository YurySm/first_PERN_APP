import React, {useContext, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/consts';
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const history = useNavigate();
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try {
            let data;

            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }

            user.setUser(user)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{
                height: window.innerHeight - 54
            }}
            >

                <Card
                    style={{
                        width: '600px',
                        padding: '30px'
                    }}
                    >
                    <Form>

                        <h2 className='text-center'>{ isLogin ? 'Авторизация' : 'Регистраниция'}</h2>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-between mb-3" controlId="formBasicPassword">
                            {isLogin ?
                                <div className='w-auto'>
                                    Нет аккаута? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink> 
                                </div>
                                :
                                <div className='w-auto'>
                                    Есть аккаут? <NavLink to={LOGIN_ROUTE}>Авторизоваться</NavLink> 
                                </div>
                            }
                                
                            <Button
                                onClick={click}
                                className='w-auto'
                                variant="primary">
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Form.Group>
                    </Form>
                </Card>

        </Container>
    );
});

export default Auth;