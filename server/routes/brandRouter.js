const Router = require('express')
const brandController = require("../controllers/brandController");
const checkRole = require('../middleware/checkRoleMiddleware') // Добавьте импорт
const router = new Router()

router.post('/', brandController.create)
router.get('/', brandController.getAll)
// Добавьте DELETE-роут
router.delete('/:id', checkRole('ADMIN'), brandController.delete)

module.exports = router
