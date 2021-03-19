'use strict';
const User = require('../models/User');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const dbValidation = async (req, res, next) => {
  if (req.body['email'] && validator.isEmail(req.body['email'])) {
    const user = await User.findOne({ email: req.body.email });
    if (user) req.error = 'User with this e-mail already exists!';
  } else if (req.body['oldpassword'] && req.body['newpassword']) {
    if (!(await bcryptjs.compare(req.body.oldpassword, req.user.password))) {
      req.error = 'Old password is wrong!';
    } else if (
      !validator.isStrongPassword(req.body.newpassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      req.error = 'New password is too weak!';
    }
  }
  next();
};

module.exports = { dbValidation };
