/*global exports, require */

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // Send Response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

// update the user Data
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1)create error if user POST password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  // 2) Filter only allowed fields (Prevent password update)
  const filetedBody = filterObj(req.body, 'name', 'email');

  // 3) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filetedBody, {
    new: true,
    runValidators: true,
  });

  // 4) Send Response
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Delete the user

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.addUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'route cannot define yet',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'route cannot define yet',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'route cannot define yet',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'route cannot define yet',
  });
};
