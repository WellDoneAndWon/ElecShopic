const Router = require('express')
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware') // Добавьте импорт
const router = new Router()

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
// Добавьте DELETE-роут
router.delete('/:id', checkRole('ADMIN'), deviceController.delete)

module.exports = router
