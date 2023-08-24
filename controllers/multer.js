const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');

// const storeImage = path.join(process.cwd(), 'public/tmp');

const getFilenameWithSuffix = originalname => {
  const uniqueSuffix =
    Date.now() + '-' + Math.round(Math.random() * 1e3);
  return uniqueSuffix + '-' + originalname;
};

const tmpDir = path.join(process.cwd(), 'public/tmp');
const avatarsDir = path.join(
  process.cwd(),
  'public/avatars'
);

const uploadAvatar = async (req, res, next) => {
  const { description } = req.body;
  const {
    path: tempPathName,
    originalname,
    filename,
    mimetype,
  } = req.file;

  const fileName = path.join(tmpDir, filename);

  try {
    if (
      mimetype === 'image/png' ||
      mimetype === 'image/jpg'
    ) {
    }
    await fs.rename(tempPathName, fileName);
  } catch (err) {
    await fs.unlink(tempPathName);
    console.log(err);
  }
  try {
    Jimp.read(fileName, function (err, test) {
      if (err) throw err;
      test
        .resize(250, 250)
        .quality(100)
        .write(
          avatarsDir +
            '/' +
            getFilenameWithSuffix(originalname)
        );
    });
  } catch (err) {
    next(err);
  }
  try {
    await fs.unlink(path.join(fileName));
  } catch (err) {
    next(err);
  }

  res.json({
    description,
    message: 'File uploaded successfully',
    status: 200,
  });
};

module.exports = uploadAvatar;
