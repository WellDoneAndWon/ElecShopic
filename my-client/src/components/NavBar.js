import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container, Badge } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, BASKET_ROUTE } from '../utils/constants';
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import { Basket } from 'react-bootstrap-icons';

const NavBar = observer(() => {
    const { user, basket } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(LOGIN_ROUTE);
    };

    const handleAuthClick = () => navigate(LOGIN_ROUTE);

    const handleBasketClick = () => {
        if (!user.isAuth) {
            navigate(LOGIN_ROUTE);
            return;
        }
        navigate(BASKET_ROUTE);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={NavLink} to={SHOP_ROUTE} style={{ color: 'white' }}>
                    ElecShopic
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ms-auto d-flex align-items-center">
                        <Button
                            variant="outline-light"
                            className="me-2 position-relative"
                            onClick={handleBasketClick}
                        >
                            <Basket size={20} />
                            {basket.totalCount > 0 && (
                                <Badge
                                    pill
                                    bg="danger"
                                    className="position-absolute top-0 start-100 translate-middle"
                                >
                                    {basket.totalCount}
                                </Badge>
                            )}
                        </Button>

                        {user.isAuth ? (
                            <>
                                {user.role === 'ADMIN' && (
                                    <Button
                                        variant="outline-light"
                                        onClick={() => navigate(ADMIN_ROUTE)}
                                        className="me-2"
                                    >
                                        Админ панель
                                    </Button>
                                )}
                                <Button
                                    variant="outline-light"
                                    onClick={logOut}
                                >
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outline-light"
                                onClick={handleAuthClick}
                            >
                                Авторизация
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
