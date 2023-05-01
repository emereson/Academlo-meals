const Orders = require('../models/orders.modal');
const catchAsync = require('../utils/catchAsync');

exports.findAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Orders.findAll({
    where: {
      status: 'active',
    },
  });
  res.status(201).json({
    status: 'success',
    orders,
  });
});
exports.findMe = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Orders.findOne({
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'Success',
    orders,
  });
});

exports.createOrders = catchAsync(async (req, res, next) => {
  const { meals, sessionUser } = req;
  const { quantity } = req.body;

  const orders = await Orders.create({
    quantity,
    mealId: meals.id,
    userId: sessionUser.id,
    totalPrice: meals.price * quantity,
  });
  res.status(201).json({
    status: 'success',
    message: 'The order has been created',
    orders,
  });
});

exports.updateMeals = catchAsync(async (req, res, next) => {
  const { orders } = req;

  await orders.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'The orders this is  completed',
    orders,
  });
});

exports.deleteMeals = catchAsync(async (req, res, next) => {
  const { orders } = req;

  await orders.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'The orders has been canceled',
    orders,
  });
});
