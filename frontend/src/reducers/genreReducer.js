import {
  GET_GENRES_ERROR,
  GET_GENRES_SUCCESS,
  ADD_GENRE_SUCCESS,
  ADD_GENRE_ERROR,
} from "../actions/actionTypes";

const initialState = {
  genres: [],
  newGenre: {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload,
      };

    case GET_GENRES_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ADD_GENRE_SUCCESS:
      return {
        ...state,
        newGenre: action.payload,
      };

    case ADD_GENRE_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
