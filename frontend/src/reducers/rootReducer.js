import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import genreReducer from "./genreReducer";

export default combineReducers({
  auth: authReducer,
  movie: movieReducer,
  genre: genreReducer,
});
