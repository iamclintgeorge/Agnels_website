import bcrypt from "bcrypt";
import { signupUser, loginUser } from "../../models/admin/userModels.js";
import { roleBasedAccess } from "../../utils/permissionMap.js";

export const signupController = async (req, res) => {
  try {
    console.log("req.body:  ", req.body);
    const { emailId, userName, password, role } = req.body;
    console.log(
      "emailId, userName, password, role: ",
      emailId,
      userName,
      password,
      role
    );

    if (!emailId || !userName || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await signupUser(emailId, userName, hashedPassword, role);

    if (!user) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    // Get permissions based on role
    const permissions = roleBasedAccess[user.role] || [];

    req.session.user = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
      role: user.role,
      permissions: permissions,
    };

    console.log("req.session.user", req.session.user);

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
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await loginUser(emailId, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Get permissions based on role
    const permissions = roleBasedAccess[user.role] || [];

    req.session.user = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
      role: user.role,
      permissions: permissions,
    };

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        emailId: user.emailId,
        userName: user.userName,
        role: user.role,
        permissions: permissions,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const logoutController = async (req, res) => {
  console.log("Console msg logoutController");
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
