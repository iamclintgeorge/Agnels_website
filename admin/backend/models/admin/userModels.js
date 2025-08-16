import db from "../../config/db.js";
import bcrypt from "bcrypt";

// signupUser function
export const signupUser = async (emailId, userName, hashedPassword, role) => {
  const query =
    "INSERT INTO users (emailId, userName, password, role) VALUES (?, ?, ?, ?)";
  const values = [emailId, userName, hashedPassword, role];

  try {
    const [result] = await db.promise().query(query, values);
    const [roleRows] = await db
      .promise()
      .query("SELECT permissions FROM roles WHERE name = ?", [role]);

    const permissions = roleRows[0]?.permissions || [];
    return { id: result.insertId, emailId, userName, role, permissions };
  } catch (err) {
    console.error("Error inserting user:", err);
    throw new Error("Failed to sign up the user");
  }
};

// loginUser function
export const loginUser = async (emailId, password) => {
  const query = "SELECT * FROM users WHERE emailId = ?";
  const values = [emailId];

  try {
    const [rows] = await db.promise().query(query, values);
    const user = rows[0];

    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return null;
    }

    const [roleRows] = await db
      .promise()
      .query("SELECT permissions FROM roles WHERE name = ?", [user.role]);

    user.permissions = roleRows[0]?.permissions || [];

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to log in the user");
  }
};

export const changeUserPassword = async (userId, oldPassword, newPassword) => {
  const getUserQuery = "SELECT password FROM users WHERE id = ?";
  const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";

  try {
    // 1) Get current user password from database
    const [userRows] = await db.promise().query(getUserQuery, [userId]);
    const user = userRows[0];

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // 2) Verify old password
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      return { success: false, message: "Current password is incorrect" };
    }

    // 3) Hash new password - USING SAME PARAMETERS AS SIGNUP
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 4) Update password in database
    await db.promise().query(updatePasswordQuery, [hashedNewPassword, userId]);

    return { success: true, message: "Password changed successfully" };
    
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error("Failed to change password");
  }
};

//Fetch User Roles
export const fetchRoles = async (req, res) => {
  const query = "SELECT * FROM roles";

  try {
    const [rows] = await db.promise().query(query);
    const res = rows;

    if (!res) {
      return null;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Fetch User Permissions
export const fetchPermissions = async (req, res) => {
  const query = "SELECT * FROM permissions";

  try {
    const [rows] = await db.promise().query(query);
    const res = rows;

    if (!res) {
      return null;
    }
    // console.log("fetchPermissionsModel", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
