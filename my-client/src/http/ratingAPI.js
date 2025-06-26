import { $authHost, $host } from "./index";

export const setRating = async (deviceId, rate) => {
    console.log('Отправка рейтинга:', { deviceId, rate });
    const { data } = await $authHost.post('api/rating', {
        deviceId,
        rate
    });
    return data;
};

export const fetchAverageRating = async (deviceId) => {
    const { data } = await $host.get(`api/rating/${deviceId}`);
    return data.avg;
};
