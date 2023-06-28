import User from "../models/user.js";
import { sendEmail } from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import express from "express";
const router = express.Router();

/**
 * Create a new user.
 * @route POST /api/auth/signUp
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} A success message if the user is created successfully.
 * @throws {Error} If the email already exists or an error occurs while saving the user.
 */
router.post("/signUp", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res
        .status(409)
        .json({ error: "The entered Email already exists!" });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User has been created successfully!" });

    sendEmail(email, "Welcome to iCinema", "Welcome to iCinema");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Authenticate a user.
 * @route POST /api/auth/signIn
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} An access token and user information if authentication is successful.
 * @throws {Error} If the email or password is incorrect, or an error occurs during authentication.
 */
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Username or Password Incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Username or Password Incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(202).json({
      accessToken: token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
