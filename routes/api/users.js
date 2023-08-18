const express = require('express');
const router = express.Router();
const authController = require('../../controllers/users');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/current', authController.current);

module.exports = router;
