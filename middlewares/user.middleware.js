const User = require('../models/user.modal');
const Orders = require('../models/orders.modal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistUse = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: Orders,
      },
    ],
  });

  if (!user) {
    return next(new AppError(`user with id: ${id} not found `, 404));
  }

  req.user = user;
  next();
});
