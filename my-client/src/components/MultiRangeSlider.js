import React, { useRef, useEffect } from "react";
import "./MultiRangeSlider.css";

const MultiRangeSlider = ({
                              min,
                              max,
                              minValue,
                              maxValue,
                              onChange
                          }) => {
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    // Преобразуем значения в числа и ограничиваем диапазоном
    const minVal = Math.max(min, Math.min(Number(minValue), Number(maxValue) - 1));
    const maxVal = Math.min(max, Math.max(Number(maxValue), Number(minValue) + 1));

    // Рассчитываем позиции для трека
    const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

    useEffect(() => {
        if (range.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxVal);
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, maxVal, min, max]);

    return (
        <div className="slider-container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={e => {
                    const value = Math.min(Number(e.target.value), maxVal - 1);
                    onChange({ min: value, max: maxVal });
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={e => {
                    const value = Math.max(Number(e.target.value), minVal + 1);
                    onChange({ min: minVal, max: value });
                }}
                className="thumb thumb--right"
            />
            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__left-value">{minVal.toLocaleString()}</div>
                <div className="slider__right-value">{maxVal.toLocaleString()}</div>
            </div>
        </div>
    );
};

export default MultiRangeSlider;
