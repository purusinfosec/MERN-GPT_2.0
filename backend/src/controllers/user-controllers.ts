import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// 🟢 Get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", cause: error.message });
  }
};

// 🟢 User Signup
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).json({ message: "User already exists" });

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Clear old cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      signed: true,
    });

    // Set new cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      signed: true,
      expires,
    });

    return res.status(201).json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", cause: error.message });
  }
};

// 🟢 User Login
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return res.status(403).json({ message: "Invalid password" });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Clear old cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      signed: true,
    });

    // Set new cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      signed: true,
      expires,
    });

    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", cause: error.message });
  }
};

// 🟢 Verify User (Auth Status)
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User not registered OR Token malfunctioned" });

    if (user._id.toString() !== res.locals.jwtData.id) return res.status(401).json({ message: "Permission denied" });

    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", cause: error.message });
  }
};

// 🟢 User Logout
export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User not registered OR Token malfunctioned" });

    if (user._id.toString() !== res.locals.jwtData.id) return res.status(401).json({ message: "Permission denied" });

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      signed: true,
    });

    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", cause: error.message });
  }
};
