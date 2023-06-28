import mongoose from "mongoose";

const genreSchema = mongoose.Schema({
  name: { type: String, default: "uncategorized" },
});

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;
