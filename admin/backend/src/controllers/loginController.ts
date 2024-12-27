import bcrypt from "bcrypt";
import { signupUser, loginUser } from "../models/userModels.js";
import { Request, Response, RequestHandler } from "express";
import { Session } from "express-session";

interface UserSession {
  user: {
    id: string;
    emailId: string;
    userName: string;
  }
}

interface CustomRequest extends Request {
  session: Session & UserSession;
}

export const signupController: RequestHandler = async (req, res) => {
  try {
    const { emailId, userName, password } = req.body;

    if (!emailId || !userName || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await signupUser(emailId, userName, hashedPassword);

    if (!user) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }

    (req as CustomRequest).session.user = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
    };

    res.status(201).json({ message: "User created successfully", user });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: (err as Error).message });
  }
};

export const loginController: RequestHandler = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await loginUser(userName, password);

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    (req as CustomRequest).session.user = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
    };

    res.status(200).json({ message: "User successfully logged in", user });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: (err as Error).message });
  }
};

export const logoutController: RequestHandler = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Could not log out", error: (err as Error).message });
        return;
      }

      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: (err as Error).message });
  }
};