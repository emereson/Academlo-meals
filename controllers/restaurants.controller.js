const Restaurants = require('../models/restaurants.modal');
const catchAsync = require('../utils/catchAsync');

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurants.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(201).json({
    status: 'success',
    results: restaurants.length,
    restaurants,
  });
});

exports.findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(201).json({
    status: 'success',
    restaurant,
  });
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurants.create({
    name,
    address,
    rating,
  });
  return res.status(201).json({
    status: 'success',
    message: 'The restaurant has been created',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  return res.status(201).json({
    status: 'success',
    message: 'The restaurant has been update',
    restaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: `The Restaurant with id: ${restaurant.id} has been deleted`,
  });
});
