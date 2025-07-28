import db from "../../config/db.js";

// GET all faculty members
export const getAllFaculties = async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM faculties WHERE teaching_staff = 1 ORDER BY sr_no ASC"
      );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching faculties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE department_id and sr_no by faculty ID
export const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { department_id, sr_no } = req.body;

  try {
    const [result] = await db
      .promise()
      .query("UPDATE faculties SET department_id = ?, sr_no = ? WHERE id = ?", [
        department_id,
        sr_no,
        id,
      ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({ message: "Faculty updated successfully" });
  } catch (error) {
    console.error("Error updating faculty:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE faculty by ID
export const deleteFaculty = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db
      .promise()
      .query("UPDATE faculties SET teaching_staff = 0 WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM departments");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch departments:", err);
    res.status(500).json({ message: "Error fetching departments" });
  }
};
