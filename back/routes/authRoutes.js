const express = require('express');
const router = express.Router();

const {registerUser, getUserProfile, loginUser, logout, deleteUser, getUserAndUpdate}= require('../controller/authController');
const { isAuthenticatedUser, validateUser, loginValidateUser, auth,tokenIsValid } = require('../middleware/auth') 

//route User 
router.route('/register').post(validateUser, registerUser);
router.route('/login').post(loginValidateUser, loginUser)
router.route('/tokenIsValid').post(tokenIsValid )
router.route('/update').post(isAuthenticatedUser, getUserAndUpdate);

router.route('/logout').get(isAuthenticatedUser, logout)
router.route('/user').get(isAuthenticatedUser, getUserProfile);

router.route('/delete/:id').delete(deleteUser)

module.exports =router; 
