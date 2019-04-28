const mongoose = require('mongoose');
const Movie = require('../models/movie');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/')
    },
    filename: (req, file, callback) =>  {
        callback(null, Date.now() + file.originalname)
    }
});
const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        callback(null, true);
    else  
        callback(null, false);
}
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});


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

exports.ADD_MOVIE = upload.single('image'), (req, res, next) => {
    const newMovie = new Movie({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        genre: req.body.genre,
        dailyRentalRate: req.body.dailyRentalRate,
        image: req.file.path
    })

    //Saving new movie in db
    newMovie.save((err, movie) => 
    {
        if(err) res.status(500).json({ error: err });
        else{
            res.status(201).json({ 
                message: "A new movie added.",
                movie: movie
            });
        }
    })
}