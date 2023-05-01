const Restaurants = require('../models/restaurants.modal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurants.findOne({
    where: {
      status: 'active',
    },
  });

  if (!restaurant) {
    return next(new AppError(`restaurant with id: ${id} not found `, 404));
  }

  req.restaurant = restaurant;
  next();
});
