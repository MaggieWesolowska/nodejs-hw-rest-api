const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

require('dotenv').config();

const secret = process.env.SECRET;

const auth = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
          data: 'Unauthorized',
        });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

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
    return res.status(409).json({
      status: 'Error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    const result = await newUser.save();
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
  try {
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: '1h',
    });
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
  const { id } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: id },
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

const updateSub = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { subscription } = req.body;
    const result = await User.findById(userId);
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
  auth,
  signup,
  login,
  logout,
  current,
  updateSub,
};
