import Genre from "../models/genre.js";
import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";
const router = express.Router();

/**
 * Get all genres.
 * @route GET /api/genres
 * @returns {object[]} An array of genre objects.
 * @throws {Error} If an error occurs while fetching the genres.
 */
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

/**
 * Add a new genre.
 * @route POST /api/genres
 * @param {string} name - The name of the genre.
 * @returns {object} A success message if the genre is added successfully.
 * @throws {Error} If the genre already exists or an error occurs while saving the genre.
 */
router.post("/", checkAuth, checkAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const isGenreExists = await Genre.findOne({ name });

    if (isGenreExists) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    const newGenre = new Genre({ name });
    await newGenre.save();

    res.status(201).json({ message: "Genre added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add genre", message: error.message });
  }
});

export default router;
