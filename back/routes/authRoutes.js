const express = require('express');
const router = express.Router();

const {registerUser, getUser, loginUser,getUserByToken, logout, deleteUser}= require('../controller/authController');
const { isAuthenticatedUser, validateUser, loginValidateUser, auth,tokenIsValid } = require('../middleware/auth') 

//route User 
router.route('/register').post(validateUser, registerUser);
router.route('/login').post(loginValidateUser, loginUser)
router.route('/tokenIsValid').post(tokenIsValid )

router.route('/logout').get(isAuthenticatedUser, logout)
router.route('/users').get(auth, getUser);

router.route('/delete').delete(auth,deleteUser)

module.exports =router; 
