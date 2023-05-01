const express = require('express');

const ordersController = require('../controllers/orders.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const ordersMiddleware = require('../middlewares/orders.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post(
  '/',
  validationMiddleware.createOrder,
  ordersController.createOrders
);

router.get('/me', ordersController.findAllOrders);

router
  .route('/:id')
  .patch(ordersMiddleware.validExistOrder, ordersController.updateMeals)
  .delete(ordersMiddleware.validExistOrder, ordersController.deleteMeals);

module.exports = router;
