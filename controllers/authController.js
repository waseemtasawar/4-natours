/*global require, , exports, process */
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1)check if email and password exist

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2)check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3)if everything is ok, send token to client

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if there is exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    next(
      new AppError('you are not logged in! please login in to get access', 401),
    );
  }
  // 2) Varification Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if user still exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    next(new AppError('The user belong to this user is no longer exist', 401));
  }
  // 4) check if user changes password after token was issue

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('user recently change the passowrd', 401));
  }

  // Grant access to protected route
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      console.log(req.user.role); // log the role from the request body

      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

exports.forgorPassword = catchAsync(async (req, res, next) => {
  // 1) Get User on Posted Email

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    next(new AppError('there is no user with this eamil', 404));
  }

  // 2) Generate the random reset token

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? submit a PATCH request with your new password and passwordConfirm to: ${resetURL}`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'yout passowrd rerset token (valid for 10 min',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token send to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('there was an error to send email', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) GEt user based on Token

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if token has not expired, and there is user, set the new passowrd
  if (!user) {
    return next(new AppError('Token in invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // 3) Update changedPasswordAt property for used

  // 4) log the user in, send jwt
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
