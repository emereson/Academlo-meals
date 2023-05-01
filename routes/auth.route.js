const express = require('express');

const authController = require('../controllers/auth.controller');
const validations = require('../middlewares/validations.middleware');

const router = express.Router();

router.post('/signup', validations.createUser, authController.signup);
router.post('/login', validations.loginUser, authController.login);

module.exports = router;
