const express = require('express');

const restaurantsController = require('../controllers/restaurants.controller');
const reviewsController = require('../controllers/reviews.controller');

const restaurantsMiddleware = require('../middlewares/restaurants.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const reviewsMiddleware = require('../middlewares/reviews.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.get('/', restaurantsController.findAllRestaurants);

router.get(
  '/:id',
  restaurantsMiddleware.validExistRestaurant,
  restaurantsController.findOneRestaurant
);

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  validationMiddleware.createUpdateRestaurantReview,
  restaurantsMiddleware.validExistRestaurant,
  reviewsController.createReview
);

router.patch(
  '/reviews/:restaurantId/:id',
  validationMiddleware.createUpdateRestaurantReview,
  restaurantsMiddleware.validExistRestaurant,
  reviewsMiddleware.validExistReview,
  reviewsController.updateReview
);

router.delete(
  '/reviews/:restaurantId/:id',
  restaurantsMiddleware.validExistRestaurant
);

router
  .use(authMiddleware.restrictTo('admin'))
  .post(
    '/',
    validationMiddleware.createRestaurant,
    restaurantsController.createRestaurant
  )
  .patch(
    '/:id',
    validationMiddleware.updateRestaurant,
    restaurantsMiddleware.validExistRestaurant,
    restaurantsController.updateRestaurant
  )
  .delete(
    '/:id',
    restaurantsMiddleware.validExistRestaurant,
    restaurantsController.deleteRestaurant
  );

module.exports = router;
