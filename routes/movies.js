const express = require('express');
const router = express.Router();
// const checkAuth = require('../middleware/checkAuth');
const movieController = require('../controller/movie');


//Handling all the incoming requests 
router.get('/', movieController.GET_ALL_MOVIES);
router.post('/addmovie', movieController.ADD_MOVIE);

module.exports = router;