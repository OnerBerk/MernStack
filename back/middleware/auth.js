const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const {check, validationResult, body } = require('express-validator');

// verification si l'utilisateur est connecté 
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#\*\?])(?=.{8,})/;
exports.validateUser = [
    check('name', 'Names is required')
      .not()
      .isEmpty()
      .withMessage('User name can not be empty!')
      .custom(value => {
        if(!/^[a-z0-9]+$/i.test(value)) {
            throw new Error('The username can contain only letters and numbers.');
        }
        return true;
    })
      .isLength({min: 4})
      .withMessage('Minimum 4 characters required!'),

    check('email', 'Please include a valid Email').isEmail(),
        

  body('password')
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .matches(passwordRegex)
        .withMessage(
          'Password should have minimum eight characters, at least one letter, one number and one special character'),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
      next();
    },
  ];
  
  exports.loginValidateUser = [
    check(
        'email', 
        'Please include a valid Email').isEmail(),
    check(
        'password', 
        'Please valid password'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
      next();
    },
  ];

  exports.auth = function(req, res, next){
    try {
      const token = req.header('x-auth-token');
      if(!token){
          return res
          .status(401)
          .json({ msg:"No token, authorisation denied"});
      }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded)
          return res
            .status(401)
            .json({ msg:"Token verification failed, authorisation denied"});
            req.user = decoded.user
          next();
      } catch (err) {
          res.status(500).json({ msg: 'Token is not valid ' })
      }
  }
  exports.tokenIsValid = async function(req, res){
    try {
      const token = req.header('x-auth-token');
        if(!token){ return res
          .json(false); }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){ return res
            .json(false); }

      const user = await User.findById(decoded.id);
          if(!user){return res
          .json(false); }

          return res.json(true)

      } catch (err) {
          res.status(500).json({ msg: 'Token is not valid ' })
      }
  }