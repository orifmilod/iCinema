module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js",
    "!src/serviceWorker.js",
    "!**/*.test.js",
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.test.js",
    "<rootDir>/src/**/*.test.js",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
