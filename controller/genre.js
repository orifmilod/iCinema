import Genre from "../models/genre.js";
import express from "express";
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

export default router;
