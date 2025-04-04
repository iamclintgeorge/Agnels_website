import bcrypt from "bcrypt";
import { signupUser, loginUser } from "../../models/admin/userModels.js";

export const signupController = async (req, res) => {
  try {
    const { emailId, userName, password, role } = req.body;

    if (!emailId || !userName || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await signupUser(emailId, userName, hashedPassword, role);

    if (!user) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    // Create session user object without sensitive data
    const sessionUser = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
      role: user.role,
    };

    req.session.user = sessionUser;
    
    // Save session explicitly
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ message: "Session error" });
      }
      res.status(201).json({ 
        message: "User created successfully", 
        user: sessionUser 
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    console.log("Login request received:", req.body);
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await loginUser(emailId);
    console.log("User found:", user ? "Yes" : "No");
    
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("Password match:", match ? "Yes" : "No");
    
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create session user object without sensitive data
    const sessionUser = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
      role: user.role,
    };

    // Set the user in the session
    req.session.user = sessionUser;
    console.log("Session after setting user:", req.session);
    
    // Save the session explicitly
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ message: "Session error" });
      }
      console.log("Session saved successfully");
      res.status(200).json({ 
        message: "Login successful", 
        user: sessionUser 
      });
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    console.log("Logout request received");
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: "Could not log out" });
      }
      res.clearCookie("connect.sid");
      console.log("Session destroyed successfully");
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuthController = async (req, res) => {
  try {
    console.log("Check auth request received");
    console.log("Session:", req.session);
    console.log("User in session:", req.session.user || "Not found");
    
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    res.status(200).json({ user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
