const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUser = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Must be text type'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.updateUser = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Must be text type'),
  body('email')
    .notEmpty()
    .withMessage('Email field cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  validFields,
];

exports.loginUser = [
  body('email')
    .notEmpty()
    .withMessage('Email field cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('The field password cannot be empty'),
  validFields,
];

exports.createRestaurant = [
  body('name').notEmpty().withMessage('The name field is required'),
  body('address').notEmpty().withMessage('The address field is required'),
  body('rating')
    .notEmpty()
    .withMessage('The rating field is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('The rating value must be between 1-5'),
  validFields,
];

exports.updateRestaurant = [
  body('name').notEmpty().withMessage('The name field is required'),
  body('address').notEmpty().withMessage('The address field is required'),
  validFields,
];

exports.createUpdateRestaurantReview = [
  body('comment').notEmpty().withMessage('The comment field is required'),
  body('rating')
    .notEmpty()
    .withMessage('The rating field is required')
    .isNumeric({ min: 1 }, { max: 5 })
    .withMessage('The rating value must be between 1-5'),
  validFields,
];

exports.createMeal = [
  body('name').notEmpty().withMessage('The name field is required'),
  body('price').notEmpty().withMessage('The price field is required'),
  validFields,
];

exports.updateMeal = [
  body('name').notEmpty().withMessage('The name field is required'),
  body('price').notEmpty().withMessage('The price field is required'),
  validFields,
];

exports.createOrder = [
  body('quantity').notEmpty().withMessage('The quantity field is required'),
  body('mealId').notEmpty().withMessage('The mealId field is required'),
  validFields,
];
