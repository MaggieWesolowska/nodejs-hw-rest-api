const express = require('express');
const router = express.Router();
const authController = require('../../controllers/users');

router.post('/users/login', authController.login);
router.post('/users/logout', authController.logout);
router.post('/users/register', authController.signup);
router.post('/users/current', authController.current);

module.exports = router;
