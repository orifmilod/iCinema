import express from "express";
const router = express.Router();

import Movie from "../models/movie.js";
// import multer from "multer";

// get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      count: movies.length,
      movies: movies,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get one movie
router.get("/:movieId", async (req, res) => {
  try {
    const movie = await Movie.findById({ _id: req.params.movieId });
    if (movie) return res.status(202).json(movie);
    return res
      .status(404)
      .json({ error: "The movie you are looking doesn't exist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add new movie
router.get("/", async (req, res) => {
  try {
    const movieTitle = req.body.title.toLowerCase();

    const isMovieExists = await Movie.findOne({ title: movieTitle });
    if (isMovieExists) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
