import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../actions/actionTypes";

const extractAuthError = (actionError) =>
  actionError?.response?.data?.error ||
  actionError?.response?.data?.message ||
  "Authentication failed";

const stored = JSON.parse(localStorage.getItem("user"));
const initialUser = stored?.user || null;

const initState = {
  loggedIn: !!stored?.accessToken,
  user: initialUser,
  authMessage: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        authMessage: action.payload.message,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authMessage: extractAuthError(action.error),
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        authMessage: action.payload.message,
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        authMessage: extractAuthError(action.error),
      };

    case SIGNOUT:
      return {
        ...state,
        user: null,
        loggedIn: false,
        authMessage: null,
      };
    default:
      return state;
  }
}
