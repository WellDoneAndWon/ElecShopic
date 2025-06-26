import React, { useContext, useState, useEffect } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { SHOP_ROUTE } from "../utils/constants";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(Context);

    useEffect(() => {
        // Проверка роли при монтировании компонента
        if (user.role !== 'ADMIN') {
            navigate(SHOP_ROUTE);
        }
    }, [user.role, navigate]);

    return (
        <Container className="d-flex flex-column align-items-center" style={{marginTop: 30}}>
            <Button
                variant="outline-dark"
                className="mb-3 w-50"
                style={{maxWidth: 600}}
                onClick={() => setTypeVisible(true)}
            >
                Добавить/Удалить тип
            </Button>
            <Button
                variant="outline-dark"
                className="mb-3 w-50"
                style={{maxWidth: 600}}
                onClick={() => setBrandVisible(true)}
            >
                Добавить/Удалить бренд
            </Button>
            <Button
                variant="outline-dark"
                className="mb-3 w-50"
                style={{maxWidth: 600}}
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <Button
                variant="outline-primary"
                className="w-50"
                style={{maxWidth: 600}}
                onClick={() => {
                    console.log("Попытка перейти в управление пользователями");
                    console.log("Текущая роль:", user.role);
                    navigate('/admin/users');
                }}
            >
                Управление пользователями
            </Button>

            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
    );
};

export default Admin;
