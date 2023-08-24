const path = require('path');
const fs = require('fs').promises;

const storeImage = path.join(process.cwd(), 'images');

const uploadAvatar = async (req, res, next) => {
  const { description } = req.body;
  const {
    path: tempPathName,
    originalname,
    filename,
    mimetype,
  } = req.file;
  const fileName = path.join(storeImage, filename);

  try {
    // if (
    //   mimetype === 'image/png' ||
    //   mimetype === 'image/jpg'
    // ) {
    // }
    await fs.rename(tempPathName, fileName);
  } catch (err) {
    await fs.unlink(tempPathName);
    console.log(err);
  }

  res.json({
    description,
    message: 'File uploaded successfully',
    status: 200,
  });
};

module.exports = uploadAvatar;
