const Reviews = require('../models/reviews.modal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const reviews = await Reviews.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!reviews) {
    return next(new AppError(`reviews with id: ${id} not found `, 404));
  }

  req.reviews = reviews;
  next();
});
