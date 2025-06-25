const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ratingController.setRating);
router.get('/:deviceId', ratingController.getAverage);

module.exports = router;
