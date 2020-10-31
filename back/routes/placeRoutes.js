const express = require('express');
const router = express.Router();

const { helloJoza, newPlace, getPlace }= require('../controller/placeController');

router.route('/').get(helloJoza);

//route place 
router.route('/places/new').post(newPlace);
router.route('/places').get(getPlace);

module.exports =router;