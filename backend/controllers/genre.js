import Genre from "../models/genre.js";
import express from "express";
const router = express.Router();

// get all genres
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

export default router;
