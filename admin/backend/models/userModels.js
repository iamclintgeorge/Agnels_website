import db from "../config/db.js";
import bcrypt from "bcrypt";

// The signupUser function
export const signupUser = async (emailId, userName, hashedPassword) => {
  const query =
    "INSERT INTO users (emailId, userName, password) VALUES (?, ?, ?)";
  const values = [emailId, userName, hashedPassword];

  try {
    const [result] = await db.promise().query(query, values);
    return { id: result.insertId, emailId, userName };
  } catch (err) {
    console.error("Error inserting user:", err);
    throw new Error("Failed to sign up the user");
  }
};

// The loginUser function
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

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to log in the user");
  }
};
