import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "./actionTypes";
import Axios from "axios";

export const signIn = (credentials) => {
  return async (dispatch) => {
    try {
      const result = await Axios.post("/api/users/login", credentials);
      dispatch({ type: LOGIN_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, error });
    }
  };
};

export const signUp = (credentials) => {
  return async (dispatch) => {
    try {
      const result = await Axios.post("/api/users/signup", credentials);
      dispatch({ type: SIGNUP_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: SIGNUP_ERROR, error });
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({ type: SIGNOUT });
  };
};
