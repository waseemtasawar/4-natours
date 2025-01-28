/*global exports, require */

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

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
