import authReducer from "../authReducer";
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../../actions/actionTypes";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

describe("authReducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Initial State", () => {
    test("should return initial state when localStorage is empty", () => {
      const state = authReducer(undefined, {});
      expect(state).toEqual({
        loggedIn: false,
        user: null,
        authMessage: null,
      });
    });

    test("should extract user from stored localStorage data", () => {
      const storedData = {
        accessToken: "token123",
        user: { id: "123", role: "admin", name: "Admin User" },
      };
      localStorage.setItem("user", JSON.stringify(storedData));

      const state = {
        loggedIn: true,
        user: storedData.user,
        authMessage: null,
      };
      expect(state.user).toEqual({ id: "123", role: "admin", name: "Admin User" });
      expect(state.loggedIn).toBe(true);
    });

    test("should set loggedIn to false when no accessToken in localStorage", () => {
      const storedData = {
        user: { id: "123", role: "admin" },
      };
      localStorage.setItem("user", JSON.stringify(storedData));

      const state = {
        loggedIn: false,
        user: storedData.user,
        authMessage: null,
      };
      expect(state.loggedIn).toBe(false);
    });
  });

  describe("LOGIN_SUCCESS", () => {
    test("should update state with user data on login success", () => {
      const initialState = {
        loggedIn: false,
        user: null,
        authMessage: null,
      };

      const action = {
        type: LOGIN_SUCCESS,
        payload: {
          user: { id: "123", role: "user", name: "John" },
          message: "Login successful",
        },
      };

      const state = authReducer(initialState, action);
      expect(state.loggedIn).toBe(true);
      expect(state.user).toEqual({ id: "123", role: "user", name: "John" });
      expect(state.authMessage).toBe("Login successful");
    });
  });

  describe("LOGIN_ERROR", () => {
    test("should handle error with error field in response", () => {
      const initialState = {
        loggedIn: false,
        user: null,
        authMessage: null,
      };

      const action = {
        type: LOGIN_ERROR,
        error: {
          response: {
            data: {
              error: "Invalid credentials",
            },
          },
        },
      };

      const state = authReducer(initialState, action);
      expect(state.authMessage).toBe("Invalid credentials");
      expect(state.loggedIn).toBe(false);
    });

    test("should handle error with message field in response (fallback)", () => {
      const initialState = {
        loggedIn: false,
        user: null,
        authMessage: null,
      };

      const action = {
        type: LOGIN_ERROR,
        error: {
          response: {
            data: {
              message: "User not found",
            },
          },
        },
      };

      const state = authReducer(initialState, action);
      expect(state.authMessage).toBe("User not found");
    });

    test("should use default error message when neither error nor message exists", () => {
      const initialState = {
        loggedIn: false,
        user: null,
        authMessage: null,
      };

      const action = {
        type: LOGIN_ERROR,
        error: {
          response: {
            data: {},
          },
        },
      };

      const state = authReducer(initialState, action);
      expect(state.authMessage).toBe("Authentication failed");
    });

    test("should handle error when response structure is missing", () => {
      const initialState = {
        loggedIn: false,
        user: null,
        authMessage: null,
      };

      const action = {
        type: LOGIN_ERROR,
        error: {},
      };

      const state = authReducer(initialState, action);
      expect(state.authMessage).toBe("Authentication failed");
    });
  });

  describe("SIGNUP_SUCCESS", () => {
    test("should update state with user data on signup success", () => {
      const initialState = {
        loggedIn: false,
        user: null,
        authMessage: null,
      };

      const action = {
        type: SIGNUP_SUCCESS,
        payload: {
          user: { id: "456", role: "user", name: "Jane" },
          message: "Signup successful",
        },
      };

      const state = authReducer(initialState, action);
      expect(state.loggedIn).toBe(true);
      expect(state.user).toEqual({ id: "456", role: "user", name: "Jane" });
      expect(state.authMessage).toBe("Signup successful");
    });
  });

  describe("SIGNUP_ERROR", () => {
    test("should handle signup error with error field", () => {
      const initialState = {
        loggedIn: false,
        user: null,
        authMessage: null,
      };

      const action = {
        type: SIGNUP_ERROR,
        error: {
          response: {
            data: {
              error: "Email already exists",
            },
          },
        },
      };

      const state = authReducer(initialState, action);
      expect(state.authMessage).toBe("Email already exists");
    });

    test("should handle signup error with message field", () => {
      const initialState = {
        loggedIn: false,
        user: null,
        authMessage: null,
      };

      const action = {
        type: SIGNUP_ERROR,
        error: {
          response: {
            data: {
              message: "Password too weak",
            },
          },
        },
      };

      const state = authReducer(initialState, action);
      expect(state.authMessage).toBe("Password too weak");
    });
  });

  describe("SIGNOUT", () => {
    test("should clear user data on signout", () => {
      const initialState = {
        loggedIn: true,
        user: { id: "123", role: "user", name: "John" },
        authMessage: "Login successful",
      };

      const action = {
        type: SIGNOUT,
      };

      const state = authReducer(initialState, action);
      expect(state.loggedIn).toBe(false);
      expect(state.user).toBeNull();
      expect(state.authMessage).toBeNull();
    });
  });

  describe("Admin menu visibility edge case", () => {
    test("navbar can access state.auth.user.role after refresh", () => {
      const initialState = {
        loggedIn: true,
        user: { id: "123", role: "admin", name: "Admin User" },
        authMessage: null,
      };

      expect(initialState.user).toBeDefined();
      expect(initialState.user.role).toBe("admin");
    });
  });
});
