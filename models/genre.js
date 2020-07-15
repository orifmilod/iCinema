const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  genre: { type: String, required: true },
});
const Genre = mongoose.model("Genre", genreSchema, "genres");

module.exports = Genre;

