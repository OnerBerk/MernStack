const express = require('express');
const router = express.Router();

const {registerUser, getUser, loginUser}= require('../controller/authController');

//route User 
router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/users').get(getUser);


module.exports =router;
