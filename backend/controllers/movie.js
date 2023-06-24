import express from "express";
const router = express.Router();

import Movie from "../models/movie.js";
import Genre from "../models/genre.js";

import { upload } from "../utils/cloudinary.js";

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
    const movie = await Movie.findById({ _id: req.params.movieId })
      .populate("genre", "name")
      .exec();
    if (movie) return res.status(202).json({ movie });
    return res
      .status(404)
      .json({ error: "The movie you are looking doesn't exist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add new movie
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, genre, rate, description, trailerLink, movieLength } =
      req.body;

    const isMovieExists = await Movie.findOne({ title });

    if (isMovieExists) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    // Find an existing genre or create a new one if it doesn't exist
    let existingGenre = await Genre.findOne({ name: genre });

    if (!existingGenre) {
      // Create a new genre if it doesn't exist
      existingGenre = new Genre({ name: genre });
      await existingGenre.save();
    }

    // Create a new movie with the existing or newly created genre
    const newMovie = new Movie({
      title,
      genre: existingGenre._id,
      rate,
      description,
      trailerLink,
      movieLength,
      image: req.file.path,
    });

    await newMovie.save();

    res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to add movie", message: error.message });
  }
});

// update movie
router.patch("/:movieId", async (req, res) => {
  try {
    const updateMovie = await Movie.findByIdAndUpdate(
      { _id: req.params.movieId },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "movie updated successfully", updateMovie });
  } catch (err) {
    res.status(500).json({ err: `Something went wrong: ${err}` });
  }
});

export default router;
