import React, { useState, useEffect, useContext } from 'react';
import { Rating } from 'react-simple-star-rating';
import { setRating, fetchAverageRating } from '../http/ratingAPI';
import { Context } from '../index';

const DeviceRating = ({ deviceId, onAvgChange }) => {
    const { user } = useContext(Context);
    const [rating, setRatingState] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRating = async () => {
            try {
                setLoading(true);
                const avg = await fetchAverageRating(deviceId);
                setRatingState(avg * 20);  // Сохраняем в формате 0-100
                if (onAvgChange) onAvgChange(avg);
            } catch (e) {
                setError('Ошибка загрузки рейтинга');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadRating();
    }, [deviceId, onAvgChange]);

    const handleRate = async (rate) => {
        if (!user.isAuth) return;
        setLoading(true);
        setError(null);

        try {
            console.log('Библиотека вернула:', rate); // Должно быть 1, 2, 3, 4 или 5

            // Отправляем значение как есть (без деления на 20!)
            setRatingState(rate * 20); // Только для визуала
            await setRating(deviceId, rate); // rate уже правильное (1-5)

            const avg = await fetchAverageRating(deviceId);
            setRatingState(avg * 20);

            if (onAvgChange) {
                onAvgChange(avg);
            }
        } catch (e) {
            setError('Ошибка сохранения оценки');
            console.error(e);

            const avg = await fetchAverageRating(deviceId);
            setRatingState(avg * 20);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-3">
            <Rating
                onClick={handleRate}
                initialValue={rating}
                size={30}
                allowFraction={false}
                transition
                readonly={!user.isAuth || loading}
            />
            {error && (
                <div className="text-danger mt-2">
                    <small>{error}</small>
                </div>
            )}
        </div>
    );
};

export default DeviceRating;
