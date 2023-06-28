import User from "../models/user.js";
import express from "express";
const router = express.Router();

/**
 * Update a user by their ID.
 * @route PATCH /api/users/:userId
 * @param {string} userId - The ID of the user to update.
 * @returns {object} A success message and the updated user object.
 * @throws {Error} If the user is not found, an error occurs while updating them, or validation fails.
 */
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

/**
 * Delete a user by their ID.
 * @route DELETE /api/users/:userId
 * @param {string} userId - The ID of the user to delete.
 * @returns {object} A success message and the deleted user object.
 * @throws {Error} If the user is not found or an error occurs while deleting them.
 */
router.delete("/:userId", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ msg: "User deleted successfully", deleteUser });
  } catch (err) {
    res.status(500).json({ err: `Something went wrong: ${err}` });
  }
});

export default router;
