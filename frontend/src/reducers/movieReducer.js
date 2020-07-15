import { GET_MOVIES_SUCCESS, GET_MOVIES_ERROR } from "../actions/actionTypes";

const initialState = {
  movies: [],
  movie: {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
      };

    case GET_MOVIES_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

