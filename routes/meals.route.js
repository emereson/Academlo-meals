const express = require('express');

const mealsMiddleware = require('../middlewares/meals.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const mealsController = require('../controllers/meals.controller');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/', mealsController.findAllMeals);

router
  .route('/:id')
  .get(mealsMiddleware.validExistMeals, mealsController.findOneMeals)
  .post(mealsController.createMeals)
  .patch(mealsMiddleware.validExistMeals, mealsController.updateMeals)
  .delete(mealsMiddleware.validExistMeals, mealsController.deleteMeals);

module.exports = router;
