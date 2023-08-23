const express = require('express');
const router = express.Router();
const validateUpload = require('../../middleware/validateUpload');
const uploadAvatar = require('../../controllers/multer');

router.post('/upload', validateUpload, uploadAvatar);

module.exports = router;
