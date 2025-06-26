import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import TypeBar from '../components/TypeBar';
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { Context } from "../index";
import { fetchTypes, fetchBrands, fetchDevices, fetchPriceRange } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import Pages from "../components/Pages";
import MultiRangeSlider from "../components/MultiRangeSlider";

const Shop = observer(() => {
    const { device } = useContext(Context);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Диапазон цен для выбранных фильтров (min/max по всем подходящим товарам)
    const [priceBounds, setPriceBounds] = useState({ minPrice: 0, maxPrice: 0 });
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [inputMin, setInputMin] = useState(0);
    const [inputMax, setInputMax] = useState(0);

    // Сброс страницы при изменении фильтров
    useEffect(() => {
        device.setPage(1);
        // eslint-disable-next-line
    }, [device.selectedType, device.selectedBrand, search, priceRange]);

    // Инициализация: загрузка типов, брендов, диапазона цен
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetchTypes(),
            fetchBrands(),
            fetchPriceRange(null, null)
        ])
            .then(([typesData, brandsData, priceData]) => {
                device.setTypes(typesData);
                device.setBrands(brandsData);
                setPriceBounds(priceData);
                setPriceRange({ min: priceData.minPrice, max: priceData.maxPrice });
                setInputMin(priceData.minPrice);
                setInputMax(priceData.maxPrice);
            })
            .finally(() => setIsLoading(false));
    }, [device]);

    // При изменении типа или бренда — обновить диапазон цен и сбросить страницу
    useEffect(() => {
        const fetchBounds = async () => {
            const typeId = device.selectedType?.id || null;
            const brandId = device.selectedBrand?.id || null;
            const data = await fetchPriceRange(typeId, brandId);
            setPriceBounds(data);
            setPriceRange({ min: data.minPrice, max: data.maxPrice });
            setInputMin(data.minPrice);
            setInputMax(data.maxPrice);
        };
        fetchBounds();
    }, [device.selectedType, device.selectedBrand]);

    // Загрузка устройств (пагинация)
    useEffect(() => {
        setIsLoading(true);
        fetchDevices(device.selectedType?.id, device.selectedBrand?.id, device.page, 3)
            .then(data => {
                device.setDevices(data.rows);
                device.setTotalCount(data.count);
            })
            .finally(() => setIsLoading(false));
    }, [device.page, device.selectedType, device.selectedBrand, priceRange]);

    // Применение фильтра по цене
    const handleApplyPrice = () => {
        const min = Math.max(priceBounds.minPrice, Math.min(Number(inputMin), Number(inputMax) - 1));
        const max = Math.min(priceBounds.maxPrice, Math.max(Number(inputMax), Number(inputMin) + 1));
        setPriceRange({ min, max });
        setInputMin(min);
        setInputMax(max);
    };

    // Сброс фильтра по цене
    const handleResetPrice = () => {
        setPriceRange({ min: priceBounds.minPrice, max: priceBounds.maxPrice });
        setInputMin(priceBounds.minPrice);
        setInputMax(priceBounds.maxPrice);
    };

    // Фильтрация устройств по поиску и цене
    const filteredDevices = useMemo(() => {
        return device.devices.filter(dev =>
            dev.name.toLowerCase().includes(search.toLowerCase()) &&
            dev.price >= priceRange.min &&
            dev.price <= priceRange.max
        );
    }, [device.devices, search, priceRange]);

    return (
        <Container>
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
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar />
                    {/* Фильтр по цене */}
                    <div className="mt-4 p-3" style={{
                        background: '#f8f9fa',
                        borderRadius: 12,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}>
                        <h6 className="mb-3">Цена</h6>
                        <MultiRangeSlider
                            min={priceBounds.minPrice}
                            max={priceBounds.maxPrice}
                            minValue={inputMin}
                            maxValue={inputMax}
                            onChange={({ min, max }) => {
                                setInputMin(min);
                                setInputMax(max);
                            }}
                        />
                        <div className="d-flex justify-content-between mt-2">
                            <Form.Control
                                type="number"
                                value={inputMin}
                                min={priceBounds.minPrice}
                                max={inputMax - 1}
                                onChange={e => setInputMin(e.target.value)}
                                style={{ width: '45%' }}
                                placeholder="Мин. цена"
                            />
                            <span className="mx-2">—</span>
                            <Form.Control
                                type="number"
                                value={inputMax}
                                min={Number(inputMin) + 1}
                                max={priceBounds.maxPrice}
                                onChange={e => setInputMax(e.target.value)}
                                style={{ width: '45%' }}
                                placeholder="Макс. цена"
                            />
                        </div>
                        <div className="text-muted mt-2" style={{ fontSize: '12px' }}>
                            Диапазон: {priceBounds.minPrice?.toLocaleString()} - {priceBounds.maxPrice?.toLocaleString()} ₽
                        </div>
                        <Button
                            variant="primary"
                            className="mt-2 w-100"
                            onClick={handleApplyPrice}
                        >
                            Применить
                        </Button>
                        <Button
                            variant="link"
                            className="mt-1 p-0 w-100"
                            onClick={handleResetPrice}
                        >
                            Сбросить фильтр
                        </Button>
                    </div>
                </Col>
                <Col md={9}>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                        </div>
                    ) : filteredDevices.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <p className="text-muted">Товары не найдены</p>
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
