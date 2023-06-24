import mongoose from "mongoose";

const genreSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
});

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;
