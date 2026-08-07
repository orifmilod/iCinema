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

const getInitialState = () => {
  let stored = null;
  const storage =
    typeof window !== "undefined" && window.localStorage
      ? window.localStorage
      : typeof globalThis !== "undefined" && globalThis.localStorage
      ? globalThis.localStorage
      : null;

  if (storage) {
    try {
      const savedUser = storage.getItem("user");
      stored = savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      stored = null;
    }
  }

  return {
    loggedIn: !!stored?.accessToken,
    user: stored?.user || null,
    authMessage: null,
  };
};

export default function (state, action) {
  const currentState = state || getInitialState();

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...currentState,
        loggedIn: true,
        user: action.payload.user,
        authMessage: action.payload.message,
      };
    case LOGIN_ERROR:
      return {
        ...currentState,
        authMessage: extractAuthError(action.error),
      };
    case SIGNUP_SUCCESS:
      return {
        ...currentState,
        loggedIn: true,
        user: action.payload.user,
        authMessage: action.payload.message,
      };

    case SIGNUP_ERROR:
      return {
        ...currentState,
        authMessage: extractAuthError(action.error),
      };

    case SIGNOUT:
      return {
        ...currentState,
        user: null,
        loggedIn: false,
        authMessage: null,
      };
    default:
      return currentState;
  }
}
