// controllers/userControllers.js
import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const access_token = user.generateAccessToken();
    const refresh_token = user.generateRefreshToken();

    user.refreshToken = refresh_token;
    await user.save();

    res.cookie('access_token', access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 2 * 24 * 60 * 60 * 1000 });
    res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 10 * 24 * 60 * 60 * 1000 });

    res.json({
      message: "Login successful.",
      access_token,
      refresh_token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const access_token = newUser.generateAccessToken();
    const refresh_token = newUser.generateRefreshToken();

    newUser.refreshToken = refresh_token;
    await newUser.save();

    res.cookie('access_token', access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 2 * 24 * 60 * 60 * 1000 });
    res.cookie('refresh_token', refresh_token, { httpOnly:true, secure: process.env.NODE_ENV === 'production', maxAge: 10 * 24 * 60 * 60 * 1000 });

    res.status(201).json({
      message: "Signup successful.",
      access_token,
      refresh_token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided." });
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token." });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({ message: "Logout successful." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

export const refreshTokenHandler = async (req, res) => {
  const refreshToken = req.cookies.refresh_token || req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('access_token', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 2 * 24 * 60 * 60 * 1000 });
    res.cookie('refresh_token', newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 10 * 24 * 60 * 60 * 1000 });

    res.json({
      message: "Tokens refreshed successfully",
      access_token: newAccessToken,
      refresh_token: newRefreshToken
    });
  } catch (error) {
    console.error("Error in refreshTokenHandler:", error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};