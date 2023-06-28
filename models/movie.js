import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  genre: [{ type: String, ref: "Genre" }],
  image: { type: String },
  rate: { type: Number, required: true, default: 0 },
  description: { type: String, require: true },
  trailerLink: { type: String },
  movieLength: { type: String, require: true },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
