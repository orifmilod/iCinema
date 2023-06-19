import User from "../models/user.js";
import { sendEmail } from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import express from "express";
const router = express.Router();

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
