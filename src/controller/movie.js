const mongoose = require('mongoose');
const Movie = require('../models/movie');

exports.GET_ALL_MOVIES = (req, res, next) => {
    Movie
    .find()
    .select('-__v') 
    .then(movies => res.status(200).json({
            count: movies.length,
            movies: movies
        }
    ))
    .catch(err => res.status(500).json({ error: err }) ); 
}

exports.ADD_MOVIE = (req, res, next) => {
    const newMovie = new Movie({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        genre: req.body.genre,
        dailyRentalRate: req.body.dailyRentalRate,
    })

    //Saving new movie in db
    newMovie.save((err, movie) => 
    {
        if(err) res.status(500).json({ error: err });
        else
        {
            res.status(201).json({ 
                message: "A new movie added.",
                movie: movie
            });
        }
    })
}