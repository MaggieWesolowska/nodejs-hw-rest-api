const jwt = require('jsonwebtoken');
const User = require('../models/user');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const sendEmail = require('../helpers/mailer');

require('dotenv').config();
const secret = process.env.SECRET;

const listUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: 'Error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    });
  }
  try {
    const newUser = new User({ email });
    const verificationToken = nanoid();

    newUser.setPassword(password);
    newUser.avatarURL = gravatar.url(email).slice(2);
    newUser.verificationToken = verificationToken;
    const result = await newUser.save();
    const verificationLink = `${req.protocol}://${req.get(
      'host'
    )}/api/users/verify/${verificationToken}`;
    sendEmail({
      to: newUser.email,
      link: verificationLink,
    });
    res.status(201).json({
      status: 'Success',
      code: 201,
      data: {
        message: 'Registration successful',
        user: {
          email: result.email,
          subscription: result.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: 'Error',
      code: 400,
      message: 'Incorrect email or password',
      data: 'Bad request',
    });
  }
  if (!user.verify) {
    return res.status(400).json({
      status: 'Error',
      code: 400,
      message: 'User not verified!',
    });
  }
  try {
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: '1h',
    });
    await User.findByIdAndUpdate(
      { _id: user._id },
      { token }
    );
    res.json({
      status: 'Success',
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findOneAndUpdate(
      { _id: _id },
      { token: null }
    );
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const current = (req, res, next) => {
  try {
    res.json({
      status: 'Success',
      code: 200,
      data: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSub = async (req, res, _) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate({
      _id: _id,
    });
    if (!result) {
      throw requestError(404, 'Not found');
    }
    result.subscription = subscription;
    await result.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listUsers,
  signup,
  login,
  logout,
  current,
  updateSub,
};
