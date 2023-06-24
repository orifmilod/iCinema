import User from "../models/user.js";
import express from "express";
const router = express.Router();

// update user
router.patch("/:userId", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "User updated successfully", updateUser });
  } catch (err) {
    res.status(500).json({ err: `Something went wrong: ${err}` });
  }
});

export default router;
