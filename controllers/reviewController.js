/*global require, , exports, */
const Review = require('.././models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  // send Response
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.addReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      reviews: newReview,
    },
  });
});
