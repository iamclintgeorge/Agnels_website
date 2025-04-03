import express, { json } from "express";
import { createConnection } from "mysql2";
import cors from "cors";
const app = express();

app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'], // Allow frontend running on port 5174
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
  }));
app.use(express.json());

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "agneladmin",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Create
app.post("/announcements", async (req, res) => {
    console.log("hi");
  const sql = "INSERT INTO announcements (subject, description, attachment, created_by) VALUES (?, ?, ?, ?)";
  const { subject, description, attachment, created_by } = req.body;
  try{
  const [result] = await db.promise().query(sql, [subject, description, attachment, created_by]);
  return result;
  }
  catch (error){
    console.error("Database Insertion Error: ", error);
    throw error;
  }
});

// Read (fetch non-deleted announcements)
app.get("/announcements", async (req, res) => {
    const sql = "SELECT * FROM announcements WHERE deleted = 0"; // Only fetch non-deleted rows
    await db.promise().query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  

// Update
app.put("/announcements/:id", async (req, res) => {
  const sql = "UPDATE announcements SET subject = ?, description = ?, attachment = ?, created_by = ? WHERE id = ?";
  const { subject, description, attachment, created_by } = req.body;
  await db.promise().query(sql, [subject, description, attachment, created_by, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Delete single
// Single soft delete (update 'deleted' column to 1)
app.delete("/announcements/:id", async (req, res) => {
    const sql = "DELETE FROM announcements WHERE id = ?";
    await db.promise().query(sql, req.params.id, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  

// Multiple soft delete (update 'deleted' column to 1 for multiple records)
app.put("/announcements/multiple", async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "'ids' must be a non-empty array." });
    }
  
    // Update deleted column to 1 for multiple records
    const sql = `UPDATE announcements SET deleted = 1 WHERE id IN (${ids.map(() => "?").join(",")})`;
  
    await db.promise().query(sql, ids, (err, result) => {
      if (err) {
        console.error("Error updating multiple announcements:", err);
        return res.status(500).json({ error: "Failed to update announcements" });
      }
      res.json({ success: true, message: "Announcements deleted successfully", affectedRows: result.affectedRows });
    });
  });
  
  

app.listen(5000, () => console.log("Server running on port 5000"));