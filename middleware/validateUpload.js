const upload = require('../../config/config-multer.js');

const validateUpload = upload.single('picture');

module.exports = validateUpload;
