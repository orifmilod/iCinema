import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "./actionTypes";
import Axios from "axios";

export const signIn = (credentials, history) => {
  return async (dispatch) => {
    try {
      const result = await Axios.post("/api/auth/signIn", credentials);
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch({ type: LOGIN_SUCCESS, payload: result.data });
      history.push("/movies");
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, error });
    }
  };
};

export const signUp = (credentials, history) => {
  return async (dispatch) => {
    try {
      const result = await Axios.post("/api/auth/signup", credentials);
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch({ type: SIGNUP_SUCCESS, payload: result.data });
      history.push("/movies");
    } catch (error) {
      dispatch({ type: SIGNUP_ERROR, error });
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: SIGNOUT });
  };
};
