import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  numberInStock: { type: Number, required: true },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  image: { type: String },
  rate: { type: Number, required: true, default: 0 },
  description: { type: String, require: true },
  trailerLink: { type: String, require: true },
  movieLength: { type: String, require: true },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
