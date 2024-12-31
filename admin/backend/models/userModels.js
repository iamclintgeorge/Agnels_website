import db from "../config/db.js"; // Import the db pool from db.ts
import bcrypt from "bcrypt";

// The signupUser function
export const signupUser = async (emailId, userName, hashedPassword) => {
  const query =
    "INSERT INTO users (emailId, userName, password) VALUES (?, ?, ?)";
  const values = [emailId, userName, hashedPassword];

  // Execute the query using the pool connection
  try {
    const [result] = await db.promise().query(query, values);
    // Assuming the inserted user id is returned in result.insertId
    return { id: result.insertId, emailId, userName };
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("Failed to sign up the user");
  }
};

// The loginUser function
export const loginUser = async (userName, password) => {
  const query = "SELECT * FROM users WHERE userName = ?";
  const values = [userName];

  // Execute the query using the pool connection
  try {
    const [rows] = await db.promise().query(query, values);
    const user = rows[0]; // Assuming the result contains the user record

    if (!user) {
      return null; // User not found
    }

    // Compare the provided password with the hashed password stored in DB
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return null; // Password doesn't match
    }

    // Return the user if authentication is successful
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to log in the user");
  }
};
