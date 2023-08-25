const passport = require('passport');
require('dotenv').config();

const auth = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, user) => {
      if (!req.get('Authorization')) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
          data: 'Unauthorized',
        });
      }
      const token = req
        .get('Authorization')
        .replace('Bearer ', '');
      if (!user || err || !token || token !== user.token) {
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

module.exports = auth;
