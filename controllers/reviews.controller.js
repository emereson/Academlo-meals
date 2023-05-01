const Reviews = require('../models/reviews.modal');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;

  const reviews = await Reviews.create({
    comment,
    rating,
    userId: sessionUser.id,
    restaurantId: restaurant.id,
  });

  return res.status(201).json({
    status: 'success',
    message: 'the reviews has ben created successfully!',
    reviews,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { reviews, restaurant } = req;
  const { comment, rating } = req.body;

  await Reviews.update({ comment, rating });

  return res.status(200).json({
    status: 'success',
    message: 'The reviews this is  completed',
    newReview: reviews,
    restaurant,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { reviews } = req;

  await reviews.update({ status: 'delete' });

  return res.status(201).json({
    status: 'success',
    message: 'The reviews has been canceled',
  });
});
