import db from "../../config/db.js";
import bcrypt from "bcrypt";

// The signupUser function
export const signupUser = async (emailId, userName, hashedPassword, role) => {
  const query =
    "INSERT INTO users (emailId, userName, password, role) VALUES (?, ?, ?, ?)";
  const values = [emailId, userName, hashedPassword, role];

  try {
    const [result] = await db.execute(query, values);
    return { id: result.insertId, emailId, userName, role };
  } catch (err) {
    console.error("Error inserting user:", err);
    throw new Error("Failed to sign up the user");
  }
};

// The loginUser function
export const loginUser = async (emailId) => {
  const query = "SELECT * FROM users WHERE emailId = ?";
  const values = [emailId];

  try {
    const [rows] = await db.execute(query, values);
    if (!rows || rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to log in the user");
  }
};
