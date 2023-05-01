const Meals = require('../models/meals.modal');
const catchAsync = require('../utils/catchAsync');

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: {
      status: 'active',
    },
  });
  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});

exports.findOneMeals = catchAsync(async (req, res, next) => {
  const { meals } = req;

  res.status(201).json({
    status: 'success',
    meals,
  });
});

exports.createMeals = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, price } = req.body;

  const meals = await Meals.create({
    name,
    price: `$ ${price}`,
    restaurantId: restaurant.id,
  });
  res.status(201).json({
    status: 'success',
    message: 'The meals has been created',
    meals,
  });
});

exports.updateMeals = catchAsync(async (req, res, next) => {
  const { meals } = req;
  const { name, price } = req.body;

  await meals.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'The meals has been update',
    meals,
  });
});

exports.deleteMeals = catchAsync(async (req, res, next) => {
  const { meals } = req;

  await meals.update({ status: 'disabled' });

  res.status(201).json({
    status: 'success',
    message: 'The meals has been delete',
    meals,
  });
});
