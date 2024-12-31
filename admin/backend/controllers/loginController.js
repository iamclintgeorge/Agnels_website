import bcrypt from "bcrypt";
import { signupUser, loginUser } from "../models/userModels.js";

export const signupController = async (req, res) => {
  try {
    const { emailId, userName, password } = req.body;

    if (!emailId || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await signupUser.checkIfUserExists(emailId, userName);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await signupUser.createUser(emailId, userName, hashedPassword);

    if (!user) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    req.session.user = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
    };

    res.cookie("uid", req.session.user.id, { httpOnly: true });

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await loginUser(userName);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    req.session.user = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
    };

    res.cookie("uid", req.session.user.id, { httpOnly: true });

    res.status(200).json({ message: "User successfully logged in", user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(400).json({ message: "No user is logged in" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Could not log out", error: err.message });
      }

      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
