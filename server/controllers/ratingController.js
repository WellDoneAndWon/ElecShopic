const { Rating } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
    async setRating(req, res, next) {
        try {
            const { deviceId, rate } = req.body;
            const userId = req.user.id;

            console.log('Сервер получил:', { deviceId, rate, userId });

            // Проверка корректности значения
            if (rate < 1 || rate > 5) {
                return next(ApiError.badRequest('Некорректное значение рейтинга'));
            }

            let rating = await Rating.findOne({
                where: { userId, deviceId }
            });

            if (rating) {
                rating.rate = rate;
                await rating.save();
            } else {
                rating = await Rating.create({ userId, deviceId, rate });
            }

            return res.json(rating);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAverage(req, res, next) {
        try {
            const { deviceId } = req.params;
            const ratings = await Rating.findAll({
                where: { deviceId }
            });

            if (!ratings.length) return res.json({ avg: 0 });

            const total = ratings.reduce((sum, r) => sum + r.rate, 0);
            const avg = total / ratings.length;

            return res.json({ avg });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RatingController();
