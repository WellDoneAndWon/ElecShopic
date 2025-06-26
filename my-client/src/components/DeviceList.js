import { Row, Col, Button, Spinner } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";

const DeviceList = observer(({ devices }) => {
    const { device, user } = useContext(Context);

    const handleDelete = (id) => {
        if (window.confirm("Удалить это устройство?")) {
            device.deleteDevice(id);
        }
    }

    if (!devices || devices.length === 0) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <p className="text-muted">Товары не найдены</p>
            </div>
        );
    }

    return (
        <Row className="d-flex">
            {devices.map(deviceItem => (
                <Col md={4} key={deviceItem.id} className="mb-4">
                    <DeviceItem device={deviceItem} />
                    {user.role === 'ADMIN' && (
                        <Button
                            variant="outline-danger"
                            className="mt-2 w-100"
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
