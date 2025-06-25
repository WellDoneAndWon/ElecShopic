const Router = require('express')
const typeController = require("../controllers/typeController");
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
// Добавьте DELETE-роут
router.delete('/:id', checkRole('ADMIN'), typeController.delete)

module.exports = router
