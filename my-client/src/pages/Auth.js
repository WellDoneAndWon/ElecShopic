import React, { useContext, useState } from 'react';
import { Container, Form, Card, Button, Row, Col } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/constants";
import { login, registration } from "../http/userAPI";
import { Context } from "../index";
import {observer} from "mobx-react"; // Добавьте импорт контекста

const Auth = observer( () => {
    const { user } = useContext(Context); // Получаем объект пользователя из контекста
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }

            console.log("Данные пользователя после авторизации:", data); // Отладочное сообщение

            user.setUser(data);
            user.setIsAuth(true);
            user.setRole(data.role);

            navigate(SHOP_ROUTE);
        } catch (e) {
            console.error("Ошибка авторизации:", e); // Отладочное сообщение
            alert(e.response?.data?.message || "Произошла ошибка");
        }
    };


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5 shadow">
                <h2 className="text-center mb-4">
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h2>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="lg"
                            required // Добавил required для валидации
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="lg"
                            required // Добавил required для валидации
                        />
                    </Form.Group>

                    <Row className="align-items-center">
                        <Col xs={12} md={6} className="mb-3 mb-md-0">
                            {isLogin ? (
                                <div>
                                    Нет аккаунта?{' '}
                                    <NavLink
                                        to={REGISTRATION_ROUTE}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Зарегистрируйся!
                                    </NavLink>
                                </div>
                            ) : (
                                <div>
                                    Есть аккаунт?{' '}
                                    <NavLink
                                        to={LOGIN_ROUTE}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Войдите!
                                    </NavLink>
                                </div>
                            )}
                        </Col>

                        <Col xs={12} md={6} className="text-md-end">
                            <Button
                                variant="outline-success"
                                type="submit"
                                size="lg"
                                className="px-4"
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
