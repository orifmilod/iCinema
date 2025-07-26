import {
  GET_GENRES_ERROR,
  GET_GENRES_SUCCESS,
  ADD_GENRE_SUCCESS,
  ADD_GENRE_ERROR,
} from "./actionTypes";
import Axios from "axios";

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const result = await Axios.get("/api/genres");
      dispatch({ type: GET_GENRES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: GET_GENRES_ERROR, error });
    }
  };
};

export const addGenre = (genre) => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.accessToken : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await Axios.post("/api/genres", genre, config);
      dispatch({ type: ADD_GENRE_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: ADD_GENRE_ERROR, error });
    }
  };
};
