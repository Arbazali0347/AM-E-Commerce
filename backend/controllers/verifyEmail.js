import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ success: false, message: "Token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find user and mark as verified
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    res.json({ success: true, message: "Email verified successfully ✅" });
  } catch (err) {
    console.log("Verify Error:", err);
    res.status(500).json({ success: false, message: "Invalid or expired token" });
  }
};
