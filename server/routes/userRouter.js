// routes/userRouter.js
const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

// Новое: только для админов
router.get('/admin', authMiddleware, checkRoleMiddleware(['ADMIN']), userController.getAllUsers);
router.put('/:id/role', authMiddleware, checkRoleMiddleware(['ADMIN']), userController.updateUserRole);
router.delete('/:id', authMiddleware, checkRoleMiddleware(['ADMIN']), userController.deleteUser);

module.exports = router;
