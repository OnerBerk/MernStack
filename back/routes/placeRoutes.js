const express = require('express');
const router = express.Router();

const { helloJoza, newPlace, getPlace, deletePlace,findPlace }= require('../controller/placeController');
const { isAuthenticatedUser } = require('../middleware/auth')

router.route('/').get(helloJoza);


//route place 
router.route('/places/new').post(isAuthenticatedUser, newPlace);

router.route('/places').get(getPlace);
router.route('/places/findByTitle').get(findPlace);
router.route('/places/delete').get(deletePlace);

module.exports =router;