import { RowDataPacket } from 'mysql2'; // Import RowDataPacket for typed result
import db from "../config/db.js"; // Import the db pool from db.ts

// Define User type based on the database columns
interface User {
  id: string;
  emailId: string;
  userName: string;
  password: string;
}

// The signupUser function
export const signupUser = async (
  emailId: string,
  userName: string,
  hashedPassword: string
): Promise<User | null> => {
  const query =
    "INSERT INTO users (emailId, userName, password) VALUES (?, ?, ?)";
  const values = [emailId, userName, hashedPassword];

  // Execute the query using the pool connection
  try {
    const [rows] = await db.promise().query<RowDataPacket[]>(query, values);
    return rows[0] as User; // Accessing the first row and asserting it as a User object
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("Failed to sign up the user");
  }
};

// The loginUser function
export const loginUser = async (
  userName: string,
  password: string
): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE userName = ?";
  const values = [userName];

  // Execute the query using the pool connection
  try {
    const [rows] = await db.promise().query<RowDataPacket[]>(query, values);
    const user = rows[0] as User; // Return the first row as user
    return user || null; // If no user is found, return null
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to log in the user");
  }
};
