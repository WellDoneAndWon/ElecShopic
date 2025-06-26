import { Row, Col, Button } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";

const DeviceList = observer(() => {
    const { device, user } = useContext(Context); // Добавляем user

    const handleDelete = (id) => {
        if (window.confirm("Удалить это устройство?")) {
            device.deleteDevice(id);
        }
    }

    return (
        <Row className="d-flex">
            {device.devices.map(deviceItem => (
                <Col md={4} key={deviceItem.id} className="mb-4">
                    <DeviceItem device={deviceItem} />
                    {/* Показываем кнопку только для админа */}
                    {user.role === 'ADMIN' && (
                        <Button
                            variant="outline-danger"
                            className="mt-2"
                            onClick={() => handleDelete(deviceItem.id)}
                        >
                            Удалить устройство
                        </Button>
                    )}
                </Col>
            ))}
        </Row>
    );
});

export default DeviceList;
