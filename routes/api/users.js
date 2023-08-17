const express = require('express');
const router = express.Router();
// const {
//   signup,
//   login,
//   logout,
//   current,
// } = require('../../controllers/users');
// const ctrlTask = require('../../helpers/ctrlTask');

// router.post('/signup', ctrlTask(signup));
// router.post('/login', ctrlTask(login));
// router.post('/logout', ctrlTask(logout));
// router.post('/current', ctrlTask(current));

const authController = require('../../controllers/users');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/current', authController.current);

module.exports = router;
