const mongoose = require('mongoose');
const Genre = require('../models/genre');

exports.GET_ALL_GENRES = (req, res, next) => {
    console.log("Getting all genres from DB");
    Genre
    .find((error, docs) => {
        if(error) return res.status(500).json(error);
        else return res.status(200).json(docs)
    })
}
exports.ADD_GENRE = (req, res, next) => {
    const genre = new Genre({ 
        _id: mongoose.Types.ObjectId(),
        genre: req.body.genre
    })
    genre
    .save()
    .then(() => res.status(201).json({ message: "Genre added successfuly to MongoDB" }))
    .catch(err => 
        res.status(500).json({
            message: "Something went wrong when adding to MongoDB",
            error: err 
    }));
}