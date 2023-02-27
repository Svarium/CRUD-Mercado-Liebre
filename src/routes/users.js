// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {register, processRegister, login, processLogin, profile, logout} = require('../controllers/usersController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

router
    .get('/register',register)
    .post('/register', registerValidator, processRegister)
    .get('/login', login)
    .post('/login',loginValidator, processLogin)
    .get('/profile', profile)
    .get('/logout', logout)

module.exports = router;
