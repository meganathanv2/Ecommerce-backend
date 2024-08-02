const express = require('express');
const authController = require('../controllers/userController');

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);

module.exports = Router;
