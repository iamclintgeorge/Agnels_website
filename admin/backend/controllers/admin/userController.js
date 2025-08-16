import bcrypt from "bcrypt";
import {
  signupUser,
  loginUser,
  fetchRoles,
  fetchPermissions,
  changeUserPassword,
} from "../../models/admin/userModels.js";

export const changePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated. Please log in." });
    }

    // Validation
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old and new passwords are required" });
    }

    // if (newPassword.length < 6) {
    //   return res.status(400).json({ message: "New password must be at least 6 characters long" });
    // }

    // if (oldPassword === newPassword) {
    //   return res.status(400).json({ message: "New password must be different from the old password" });
    // }

    // Get user ID from session
    const userId = req.session.user.id;

    // Change password
    const result = await changeUserPassword(userId, oldPassword, newPassword);
    
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: err.message 
    });
  }
};


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

    req.session.user = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
      role: user.role,
      permissions: user.permissions,
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

    req.session.user = {
      id: user.id,
      emailId: user.emailId,
      userName: user.userName,
      role: user.role,
      permissions: user.permissions,
    };

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        emailId: user.emailId,
        userName: user.userName,
        role: user.role,
        permissions: user.permissions,
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

export const fetchrolesController = async (req, res) => {
  try {
    const roles = await fetchRoles();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch roles" });
  }
};

export const fetchpermissionsController = async (req, res) => {
  try {
    const permissions = await fetchPermissions();
    // console.log("fetchpermissionsController", permissions);
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Permissions" });
  }
};
