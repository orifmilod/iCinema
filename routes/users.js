const express = require('express');
const router = express.Router();
const usersController = require('../controller/user');

//Handling all the incoming requests 
router.post('/signup', usersController.SIGN_UP);
router.post('/login', usersController.SIGN_IN);

module.exports = router;