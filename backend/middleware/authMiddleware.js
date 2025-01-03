// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from "../model/userModel.js"; 

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided. Please login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired access token.' });
  }
};

export const refreshTokenMiddleware = async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token || req.headers['x-refresh-token'];
  
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Refresh token is invalid or expired.' });
    }

    const newAccessToken = user.generateAccessToken();
    res.cookie('access_token', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token.' });
  }
};