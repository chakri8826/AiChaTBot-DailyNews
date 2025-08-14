import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateTokenAndSetCookie(user._id,res);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,  
      image: user.image,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt-Token");
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const authCheck = (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}; 
