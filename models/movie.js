const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  numberInStock: { type: Number, required: true },
  genre: { type: String, required: true },
  image: { data: Buffer, contentType: String },
  rate: { type: Number, required: true },
  description: { type: String, require: true },
  trailerLink: { type: String, require: true },
  movieLength: { type: String, require: true },
});

module.exports = mongoose.model("Movie", movieSchema, "movies");

