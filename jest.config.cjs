module.exports = {
  displayName: "backend",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "/frontend/"],
  collectCoverageFrom: [
    "controller/**/*.js",
    "models/**/*.js",
    "middleware/**/*.js",
    "!**/*.test.js",
  ],
};
