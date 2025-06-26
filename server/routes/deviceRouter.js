const Router = require('express')
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/price-range', deviceController.getPriceRange)
router.get('/:id', deviceController.getOne)
router.delete('/:id', checkRole('ADMIN'), deviceController.delete)

module.exports = router
