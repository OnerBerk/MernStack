const express = require('express');
const router = express.Router();

const {helloJoza }= require('../controller/helloController')

router.route('/').get(helloJoza)

module.exports =router;