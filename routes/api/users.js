const express = require('express');
const router = express.Router();
const authController = require('../../controllers/users');

router.get('/', authController.listUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get(
  '/logout',
  authController.auth,
  authController.logout
);
router.get(
  '/current',
  authController.auth,
  authController.current
);

module.exports = router;
