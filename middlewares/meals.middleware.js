const Meals = require('../models/meals.modal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistMeals = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meals = await Meals.findOne({
    where: {
      status: 'active',
    },
  });
  if (!meals) {
    return next(new AppError(`meals with id: ${id} not found `, 404));
  }
  req.meals = meals;
  next();
});
