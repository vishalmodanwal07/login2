import { User } from "../model/userModel.js";


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

   
    const access_token = user.generateAccessToken();
    const refresh_token = user.generateRefershToken();

    
    user.refreshToken = refresh_token;
    await user.save();

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

    // Generate access token and refresh token
    const access_token = newUser.generateAccessToken();
    const refresh_token = newUser.generateRefershToken();

    // Save the refresh token to the user
    newUser.refreshToken = refresh_token;
    await newUser.save();

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
  
      
      res.clearCookie("access_token", { path: "/" });
      res.clearCookie("refresh_token", { path: "/" });
  
      res.status(200).json({ message: "Logout successful." });
    } catch (err) {
      res.status(500).json({ message: "Server error." });
    }
  };
