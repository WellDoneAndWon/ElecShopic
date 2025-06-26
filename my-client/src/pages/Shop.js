import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Form } from "react-bootstrap";
import TypeBar from '../components/TypeBar';
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { Context } from "../index";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { device } = useContext(Context);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetchTypes(),
            fetchBrands(),
            fetchDevices(null, null, 1, 3)
        ])
            .then(([typesData, brandsData, devicesData]) => {
                device.setTypes(typesData);
                device.setBrands(brandsData);
                device.setDevices(devicesData.rows);
                device.setTotalCount(devicesData.count);
            })
            .finally(() => setIsLoading(false));
    }, [device]);

    useEffect(() => {
        setIsLoading(true);
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3)
            .then(data => {
                device.setDevices(data.rows);
                device.setTotalCount(data.count);
            })
            .finally(() => setIsLoading(false));
    }, [device.page, device.selectedType, device.selectedBrand]);

    const filteredDevices = device.devices.filter(dev =>
        dev.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
            {/* Первая строка: поиск и бренды */}
            <Row className="mt-2 align-items-center">
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="🔍 Поиск по каталогу..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            marginBottom: 0,
                            borderRadius: 12,
                            fontSize: 17,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            padding: "10px 16px"
                        }}
                    />
                </Col>
                <Col md={9}>
                    <BrandBar />
                </Col>
            </Row>
            {/* Вторая строка: TypeBar и карточки */}
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <DeviceList devices={filteredDevices} />
                            <Pages />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
