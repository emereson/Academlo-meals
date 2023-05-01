const Orders = require('../models/orders.modal');
const AppError = require('../utils/appError');
const User = require('../models/user.modal');
const Meals = require('../models/meals.modal');
const catchAsync = require('../utils/catchAsync');

exports.validExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const orders = await Orders.findOne({
    where: {
      status: 'active',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!orders) {
    return next(new AppError(`orders with id: ${id} not found `, 404));
  }

  req.orders = orders;
  next();
});

exports.validExistMealForOrder = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meals.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`));
  }

  req.meal = meal;
  next();
});
