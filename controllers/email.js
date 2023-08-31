const User = require('../models/user');

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.json({
      status: 'Error',
      code: 404,
      message: 'User not found',
    });
  }
  user.verify = true;
  user.verificationToken = null;
  await user.save();
  return res.json({
    status: 'OK',
    code: 200,
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
