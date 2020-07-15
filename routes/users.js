const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/checkAuth");
const { signIn, signUp, updateUser } = require("../controller/user");

//Handling all the incoming requests
router.post("/signup", signUp);
router.post("/login", signIn);
router.patch("/:userID", updateUser);
module.exports = router;

