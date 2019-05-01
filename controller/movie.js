const mongoose = require('mongoose');
const Movie = require('../models/movie');
const multer = require('multer');
const fs = require('fs');

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

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/')
    },
    filename: (req, file, callback) =>  {
        callback(null, Date.now() + "-" + file.originalname)
    }
});
const upload = multer({ storage: storage }).single('image');

exports.ADD_MOVIE = (req, res, next) => {
    upload(req, res, (err) => {
        if(err) res.status(500).json(err)
        else {
            // console.log(req.file)
            fs.readFile(req.file.path, function(err, data) {
                if (err) throw err;
                else {
                    const contentType = req.file.mimetype;

                    
                    const newMovie = new Movie({
                        _id: mongoose.Types.ObjectId(),
                        title: req.body.title,
                        numberInStock: req.body.numberInStock,
                        genre: req.body.genre,
                        image: {data, contentType},
                        rate: 0, 
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

                    // Encode to base64
                    // let encodedImage = new Buffer(data, 'binary').toString('base64');
                    // Decode from base64
                    // let decodedImage = new Buffer(encodedImage, 'base64').toString('binary');
                }
            });
            // const data = fs.readFileSync(req.file.path)

        } 
    })
}